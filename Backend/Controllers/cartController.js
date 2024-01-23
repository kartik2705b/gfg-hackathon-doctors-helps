const User = require("../Modals/userSchema");

const ERRORS = {
  BAD_REQUEST: "Bad request Invalid data recieved",
  USER_NOT_FOUND: "User not found by given id",
  PRODUCT_NOT_FOUND: "product not found!",
  INTERNAL_ERROR: "Internal Server Error",
};

const getCartItems = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const CartItems = user.CartItems;
    // console.log(CartItems)

    return res.status(200).json({ CartItems });
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_ERROR, error: e.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { product, qty } = req.body;
    if (product.InStock < qty) {
      return res
        .status(400)
        .json({
          message: `Only ${product.InStock} items left In Stock`,
          error: ERRORS.BAD_REQUEST,
        });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: ERRORS.USER_NOT_FOUND });
    }

    const existingProductIndex = user.CartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingProductIndex !== -1) {
      if (
        user.CartItems[existingProductIndex].quantity + qty >
        product.InStock
      ) {
        return res
          .status(400)
          .json({
            message: `Only ${product.InStock} items left In Stock`,
            error: ERRORS.BAD_REQUEST,
          });
      }
      user.CartItems = user.CartItems.map((items, key) => {
        if (key === existingProductIndex) {
          return {
            ...items,
            quantity: items.quantity + qty,
          };
        }
        return items;
      });

      // console.log( user.CartItems[existingProductIndex].quantity , qty)
    } else {
      user.CartItems.push({ ...product, quantity: qty });
    }

    await user.save();

    return res
      .status(201)
      .json({ message: "Product added to cart successfully", user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user;
    const productId = req.params.productId;
    const { mode } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: ERRORS.USER_NOT_FOUND });
    }

    const productIndex = user.CartItems.findIndex(
      (item) => item._id === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: ERRORS.PRODUCT_NOT_FOUND });
    } else {
      if (mode === "add") {
        user.CartItems = user.CartItems.map((items, key) => {
          if (key === productIndex) {
            return {
              ...items,
              quantity: items.quantity + 1,
            };
          }
          return items;
        });
      } else {
        user.CartItems = user.CartItems.map((items, key) => {
          if (key === productIndex) {
            return {
              ...items,
              quantity: items.quantity - 1,
            };
          }
          return items;
        }).filter((items) => items.quantity !== 0);
      }
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Cart item quantity updated successfully", user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user;
    const productId = req.params.productId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: ERRORS.USER_NOT_FOUND });
    }

    user.CartItems = user.CartItems.filter((item) => item._id !== productId);

    await user.save();

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully", user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: ERRORS.INTERNAL_ERROR, error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: ERRORS.USER_NOT_FOUND });
    }

    user.CartItems = [];
    await user.save();
    return res.status(200).json({ message: "User Cart Updated", user: user });
  } catch (e) {
    return res
      .status(500)
      .json({ message: ERRORS.INTERNAL_ERROR, error: e.message });
  }
};

module.exports = {
  getCartItems,
  updateCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
};
