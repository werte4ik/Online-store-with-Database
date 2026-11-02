import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Card = () => {
  const [product, setData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { postId } = useParams();
  const imageUrl = `http://127.0.0.1:8000/Posts/${postId}`;
  useEffect(() => {
    const fetchdata = async () => {
    const data = await fetch(imageUrl)
    const responseData = {
      title: data.headers.get("x-title"),
      body: data.headers.get("x-body"),
      price: Number(data.headers.get("x-price")),
      oldPrice: Number(data.headers.get("x-oldprice")),
      rating: data.headers.get("x-rating"),
      reviews: data.headers.get("x-reviews"),
      sizes: JSON.parse(data.headers.get("x-sizes") || "\"\"").split(" ").filter(Boolean),
      category: decodeURIComponent(data.headers.get("x-category") || ""),
    }
    setData(responseData)
    if (data.ok) {
      console.log("Data fetched successfully:", data);
    } else {
      console.error("Error fetching data:", data.status, data.statusText);
    }
  }
  fetchdata()
  }, [postId]);

  if (!product) {
    return <p>Loading...</p>;
  }
  const changesize = (size) => {
    setSelectedSize(size);
    console.log(`Selected size: ${size}`);

  }
  const checkImage = ()=>{

  }
  const changecolor = (color) => {
    setSelectedColor(color);
    console.log(`Selected color: ${color}`);
  }
  const name = product.title || "Post not found";
  const description = product.body || "This post is unavailable.";
  const sizes = product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL"];
  const colors = ["#111111", "#d9c7b1", "#b8c5d6", "#c84b4b"];
  return (
    <main className="product-page">
      <div className="product-card">
        <div className="product-gallery">
          <div className="product-main-image-wrap">
            <img src={imageUrl} alt={name} className="product-main-image" />
          </div>
          <div c></div>
          <div className="product-thumbs">
            <img src={imageUrl} alt="Thumbnail 1" />
            <img src={imageUrl} alt="Thumbnail 2" />
            <img src={imageUrl} alt="Thumbnail 3" />
          </div>
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h1 className="product-title">{name}</h1>

          <div className="product-rating-row">
            <span className="product-stars">★★★★★</span>
            <span>{product.rating}</span>
            <span className="product-reviews">({product.reviews} reviews)</span>
          </div>
          <div className="product-price-row">
            <span className="product-price">${product.price}</span>
            <span className="product-old-price">${product.oldPrice}</span>
          </div>

          <p className="product-description">{description}</p>

          <div className="product-option-block">
            <div className="product-option-header">
              <span>Size</span>
              <button type="button" className="option-link">Size guide</button>
            </div>

            <div className="size-list">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-pill ${selectedSize === size ? "active" : ""}`}
                  onClick={() => changesize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-option-block">
            <div className="product-option-header">
              <span>Color</span>
            </div>

            <div className="color-list">
              {colors.map((color, index) => (
                <button
                  key={color}
                  type="button"
                  className={`color-swatch ${selectedColor === color ? "active" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => changecolor(color)}
                />
              ))}
            </div>
          </div>

          <div className="product-actions">
            <button type="button" className="btn btn-primary">Add to cart</button>
            <button type="button" className="btn btn-secondary">Buy now</button>
          </div>

          <div className="product-meta">
            <div>
              <span className="meta-label">Delivery</span>
              <span>Free shipping over $50</span>
            </div>
            <div>
              <span className="meta-label">Returns</span>
              <span>30-day easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Card;