import "../../styles/categoryFilter.css"

export function CategoryFilter({ setCategory, selectedCategory }) {
    const categories = ["electronics", "computers", "accessories", "networking"]
    const handleSelect = (e) => {
    const category = e.target.value;
    setCategory(category === "all" ? "" : category);
  };

  return (
    <div className="category-filter">
      <label htmlFor="category-select">Filter by category: </label>
      <select
        id="category-select"
        value={selectedCategory || "all"}
        onChange={handleSelect}
      >
        <option value="all">All</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
