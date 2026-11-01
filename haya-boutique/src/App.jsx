
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Classic Black Chiffon",
    category: "Chiffon",
    price: 1400,
    image: "/images/black-chiffon.jpg"
  },
  {
    id: 2,
    name: "Elegant Beige Chiffon",
    category: "Chiffon",
    price: 1400,
    image: "/images/beige-chiffon.jpg"
  },
  {
    id: 3,
    name: "Dusty Pink Georgette",
    category: "Georgette",
    price: 1300,
    image: "/images/pink-georgette.jpg"
  },
  {
    id: 4,
    name: "Chocolate Brown Cotton",
    category: "Cotton",
    price: 1200,
    image: "/images/brown-cotton.jpg"
  },
  {
    id: 5,
    name: "Lavender Jersey Hijab",
    category: "Jersey",
    price: 1500,
    image: "/images/lavender-jersey.jpg"
  },
  {
    id: 6,
    name: "Floral Printed Hijab",
    category: "Printed",
    price: 1700,
    image: "/images/printed-hijab.jpg"
  },
  {
    id: 7,
    name: "Premium Silk Hijab",
    category: "Silk",
    price: 1800,
    image: "/images/premium-silk.jpg"
  },
  {
    id: 8,
    name: "Mocha Crinkle Hijab",
    category: "Crinkle",
    price: 1500,
    image: "/images/mocha-crinkle.jpg"
  }
];

const categories = [
  "All",
  "Chiffon",
  "Georgette",
  "Cotton",
  "Jersey",
  "Printed",
  "Silk",
  "Crinkle"
];

const categoryImages = [
  {
    name: "Chiffon",
    image: "/images/beige-chiffon.jpg"
  },
  {
    name: "Georgette",
    image: "/images/pink-georgette.jpg"
  },
  {
    name: "Cotton",
    image: "/images/brown-cotton.jpg"
  },
  {
    name: "Jersey",
    image: "/images/lavender-jersey.jpg"
  },
  {
    name: "Silk",
    image: "/images/premium-silk.jpg"
  },
  {
    name: "Printed",
    image: "/images/printed-hijab.jpg"
  }
];

function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Filter products by category and search
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      category === "All" || product.category === category;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  // Add product to cart
  function addToCart(product) {
    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  // Update product quantity
  function updateQuantity(id, amount) {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Calculate cart items and total price
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Demo checkout
  function checkout() {
    if (cart.length === 0) {
      alert("Your shopping cart is empty!");
      return;
    }

    alert(
      "Thank you for shopping at Haya Hijab Boutique! Your demo order is complete."
    );

    setCart([]);
    setShowCart(false);
  }

  return (
    <div className="website">

      {/* Announcement Bar */}
      <div className="announcement">
        Welcome to Haya Hijab Boutique | Elegance in Every Wrap
      </div>

      {/* Navigation Bar */}
      <nav className="navbar">

        <a href="#home" className="logo">
          HAYA
          <span>HIJAB BOUTIQUE</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          className="cart-button"
          onClick={() => setShowCart(true)}
        >
          🛍 Cart ({totalItems})
        </button>

      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="small-heading">
            HAYA HIJAB BOUTIQUE
          </p>

          <h1>
            Elegance in
            <br />
            Every Wrap
          </h1>

          <p>
            Discover beautiful hijabs in your favorite
            colors and fabrics. Find your everyday
            elegance with Haya.
          </p>

          <a href="#products" className="shop-button">
            SHOP COLLECTION →
          </a>

        </div>

      </section>

      {/* Categories Section */}
      <section className="category-section" id="categories">

        <p className="small-heading">
          FIND YOUR STYLE
        </p>

        <h2>Explore Our Collections</h2>

        <div className="category-grid">

          {categoryImages.map((item) => (
            <button
              className="category-card"
              key={item.name}
              onClick={() => {
                setCategory(item.name);

                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >

              <img
                src={item.image}
                alt={item.name + " Hijab"}
              />

              <span>{item.name} Hijabs</span>

            </button>
          ))}

        </div>

      </section>

      {/* About Section */}
      <section className="intro" id="about">

        <p className="small-heading">
          WELCOME TO HAYA
        </p>

        <h2>Beauty Meets Modesty</h2>

        <p>
          Haya Hijab Boutique brings you beautiful
          scarves, elegant colors and comfortable
          fabrics for your everyday style.
        </p>

      </section>

      {/* Products Section */}
      <section className="products-section" id="products">

        <div className="section-heading">

          <p className="small-heading">
            OUR COLLECTION
          </p>

          <h2>Shop Your Favorite Hijabs</h2>

          <p>
            Find the perfect wrap for every occasion.
          </p>

        </div>

        {/* Search Bar */}
        <input
          type="text"
          className="search-box"
          placeholder="Search hijabs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filters */}
        <div className="filters">

          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}

        </div>

        {/* Product Cards */}
        <div className="product-grid">

          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>

              <div className="product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              <div className="product-info">

                <p className="product-category">
                  {product.category} Hijab
                </p>

                <h3>{product.name}</h3>

                <p className="price">
                  Rs. {product.price.toLocaleString("en-PK")}
                </p>

                <button
                  className="add-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

              </div>

            </div>
          ))}

        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-message">
            No hijabs found. Try another search.
          </p>
        )}

      </section>

      {/* Shopping Cart */}
      {showCart && (

        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        >

          <div
            className="cart-panel"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cart-heading">

              <h2>My Shopping Bag</h2>

              <button
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>

            </div>

            {cart.length === 0 ? (

              <p>Your shopping bag is empty.</p>

            ) : (

              cart.map((item) => (

                <div className="cart-item" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">

                    <h4>{item.name}</h4>

                    <p>
                      Rs. {item.price.toLocaleString("en-PK")}
                    </p>

                    <div className="quantity">

                      <button
                        onClick={() =>
                          updateQuantity(item.id, -1)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, 1)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

            <div className="cart-total">

              <h3>
                Total: Rs. {totalPrice.toLocaleString("en-PK")}
              </h3>

              <button
                className="checkout-button"
                onClick={checkout}
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

        </div>

      )}

      {/* Newsletter Section */}
      <section className="newsletter">

        <p className="small-heading">
          STAY CONNECTED
        </p>

        <h2>Discover Your Everyday Elegance</h2>

        <p>
          Explore beautiful hijabs with Haya Boutique.
        </p>

        <a href="#products">
          Explore Collection
        </a>

      </section>

      {/* Footer */}
      <footer id="contact">

        <h2>HAYA HIJAB BOUTIQUE</h2>

        <p>Elegance in Every Wrap</p>

        <p>
          Chiffon | Georgette | Cotton | Jersey | Silk
        </p>

        <p>
          © 2026 Haya Hijab Boutique. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;
