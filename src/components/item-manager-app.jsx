import "./item-manager-app.css"

import { useState, useRef } from "react"

import deleteLogo from "../assets/delete.svg"
import stationaryLogo from "../assets/ink_pen.svg"
import kitchenwareLogo from "../assets/flatware.svg"
import applianceLogo from "../assets/electrical_services.svg"

function ItemManager() {
  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */
  const [items, setItems] = useState([
    { id: 1, name: "Color Pencil set 32", category: "Stationary", price: 11.99 },
    { id: 2, name: "Small Kitty Lamp", category: "Appliance", price: 44.88 },
    { id: 3, name: "Knife Set 4pcs", category: "Kitchenware", price: 23.11 },
  ])
  const [errorMsg, setErrorMsg] = useState("")

  // You must use this ref for the item name input
  const itemName = useRef(null)

  // Additional state for category + price
  const [category, setCategory] = useState("") // no default
  const [price, setPrice] = useState("")

  const categoryIcons = {
    Stationary: stationaryLogo,
    Kitchenware: kitchenwareLogo,
    Appliance: applianceLogo,
  }

  const nextId = () => {
    if (items.length === 0) return 1
    const maxId = Math.max(...items.map((i) => i.id))
    return maxId + 1
  }

  const validate = (nameValue, categoryValue, priceValue) => {
    // Name must not be empty
    if (!nameValue.trim()) return "Item name must not be empty"

    // Item name must not be duplicated, case insensitive
    const dup = items.some(
      (it) => it.name.trim().toLowerCase() === nameValue.trim().toLowerCase()
    )
    if (dup) return "Item must not be duplicated"

    // Category must be selected from one of the available choices.
    if (!["Stationary", "Kitchenware", "Appliance"].includes(categoryValue)) {
      return "Please select a category"
    }

    // Price must not be less than 0
    const p = Number(priceValue)
    if (Number.isNaN(p) || p < 0) return "Price must not be less than 0"

    return ""
  }

  const handleAdd = () => {
    const nameValue = itemName.current ? itemName.current.value : ""
    const err = validate(nameValue, category, price)

    if (err) {
      setErrorMsg(err)
      return
    }

    const newItem = {
      id: nextId(),
      name: nameValue.trim(),
      category,
      price: Number(price),
    }

    setItems((prev) => [...prev, newItem])
    setErrorMsg("")

    // reset form
    if (itemName.current) itemName.current.value = ""
    setCategory("")
    setPrice("")
  }

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
    setErrorMsg("")
  }

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">Item Management</div>

      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>

          <tbody>
            {/*
              * - All items must be listed here (above the form row).
              * - Your input form must be implemented as the LAST row in this table.
              */}
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>
                  <img
                    src={categoryIcons[it.category]}
                    alt={it.category}
                    className="category-icon"
                  />
                </td>
                <td>{it.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="delete"
                    className="delete-icon"
                    onClick={() => handleDelete(it.id)}
                  />
                </td>
              </tr>
            ))}

            {/* FORM ROW (must be last row) */}
            <tr>
              <td></td>
              <td>
                <input ref={itemName} className="input" />
              </td>
              <td>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input"
                >
                  <option value=""></option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input"
                />
              </td>
              <td>
                <button className="add-btn" onClick={handleAdd}>
                  Add Item
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="error-message">{/* You MUST display the errorMsg state here. */}
        {errorMsg && <div className="error-text">{errorMsg}</div>}
      </div>
    </>
  )
}

export default ItemManager
