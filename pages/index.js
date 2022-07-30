import { useEffect, useState } from "react"
const initialState = { name: "", price: 0 }

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Home() {
  const [product, setProduct] = useState(initialState)
  const [products, setProducts] = useState([])

  const handleChange = (e) => {
    const inputValue = e.target.value
    const inputName = e.target.name
    setProduct({
      ...product,
      [inputName]: inputValue,
    })
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${baseUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
      const data = await res.json()
      setProduct(initialState)
      console.log({ data })
      const newProducts = [data.product, ...products]
      setProducts(newProducts)
      // fetchProducts()
    } catch (error) {
      console.log({ error })
    }
  }

  const fetchProducts = () => {
    fetch(`${baseUrl}/products`)
      .then((res) => res.json())
      .then(({ products }) => {
        setProducts(products)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <div className="container df jcsb">
        <div className="df fdc">
          <h2 style={{ margin: "0.3rem" }}>
            <u>Crear nuevo producto</u>
          </h2>
          <form>
            <input
              type="text"
              name="name"
              className="onone"
              value={product.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              className="onone"
              value={product.price}
              onChange={handleChange}
            />
            <button onClick={handleClick} className="cursorp">
              Crear producto
            </button>
          </form>
        </div>
        <div className="products-container">
          {products.map(({ _id, name, price }) => (
            <div className="product df aic jcsb p5 mb5 br5" key={_id}>
              <span>{name}</span>
              <div className="df fdc">
                <span>${price}</span>
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => {
                    fetch(`${baseUrl}/products/${_id}`, { method: "DELETE" })
                      .then((res) => res.json())
                      .then((data) => {
                        console.log({ data })
                      })
                  }}
                >
                  BORRAR
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          form {
            display: flex;
            flex-direction: column;
            width: 20rem;
            margin: 0 auto;
          }

          .onone {
            outline: none;
          }

          .cursorp {
            cursor: pointer;
          }

          .df {
            display: flex;
          }

          .p5 {
            padding: 0.5rem;
          }

          .br5 {
            border-radius: 0.5rem;
          }

          .mb5 {
            margin-bottom: 0.5rem;
          }

          .product {
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
          }
          .aic {
            align-items: center;
          }

          .jcc {
            justify-content: center;
          }

          .jcsb {
            justify-content: space-between;
          }

          .fdc {
            flex-direction: column;
          }

          input {
            margin-bottom: 0.5rem;
          }

          h1 {
            text-align: center;
          }

          .products-container {
            overflow: hidden;
            overflow-y: auto;
            max-height: 20rem;
            padding: 0.5rem;
          }

          .container {
            background-color: white;
            width: 50rem;
            margin: 0 auto;
            margin-top: 5rem;
            border-radius: 0.5rem;
            padding: 1rem;
          }

          input {
            padding: 0.5rem 0.75rem;
            border: 1px solid lightgrey;
            border-radius: 0.5rem;
          }

          button {
            padding: 0.5rem 0.75rem;
            border-radius: 0.5rem;
            border: none;
            background-color: rgba();
          }
        `}
      </style>
    </>
  )
}
