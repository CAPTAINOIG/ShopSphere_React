import React, { useState, useEffect } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  Eye,
  ArrowRight,
  Clock,
  TrendingUp,
  Sparkles,
  Filter,
  Grid,
} from "lucide-react";
import Newsletter from "../component/Newsletter";
import Footer from "../component/Footer";
import { List } from "lucide-react";
import { useGetProducts } from "../hooks/product";
import Loader from "../hooks/Loader";
import Count from "../component/Count";

const Shop = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("New Arrival");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  console.log(visibleCount);
  const [filteredProductsState, setFilteredProductsState] = useState([]);
  console.log(filteredProductsState);
  const [categories, setCategories] = useState([]);

  const { data: products, isLoading, isFetching, isError } = useGetProducts();

  // Initialize categories with counts
  useEffect(() => {
    if (products?.length) {
      // Extract unique categories from products
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ].map((category, index) => ({
        id: index + 1,
        category,
        count: products.filter((p) => p.category === category).length,
      }));
      setCategories(uniqueCategories);
      const filtered = applyFiltersAndSort(products, sortBy, selectedCategory);
      setFilteredProductsState(filtered);
      setVisibleCount(Math.min(6, filtered.length));
    } else {
      setFilteredProductsState([]);
      setVisibleCount(0);
    }
  }, [products]);

  const applyFiltersAndSort = (products, sortBy, selectedCategory) => {
    let filtered = [...products];
    if (selectedCategory === "New Arrival") {
      filtered = filtered.filter((product) => product.isNewArrival);
    } else if (selectedCategory === "Popular") {
      filtered = filtered.filter((product) => product.isPopular);
    } else if (selectedCategory !== "All Products") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (sortBy === "price-low") {
      filtered.sort(
        (a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price)
      );
    } else if (sortBy === "price-high") {
      filtered.sort(
        (a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price)
      );
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (sortBy === "category") {
      filtered.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === "New Arrival") {
      // If you have a createdAt date, use that instead
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  };

  const handleSortBy = (e) => {
    const value = e.target.value;
    setSortBy(value);
    const sortedFiltered = applyFiltersAndSort(
      products || [],
      value,
      selectedCategory
    );
    setFilteredProductsState(sortedFiltered);
    setVisibleCount(Math.min(6, sortedFiltered.length));
  };

  const handleCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    const sortedFiltered = applyFiltersAndSort(
      products || [],
      sortBy,
      categoryName
    );
    setFilteredProductsState(sortedFiltered);
    setVisibleCount(Math.min(6, sortedFiltered.length));
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Black", value: "black", hex: "#000000" },
    { name: "White", value: "white", hex: "#FFFFFF" },
    { name: "Gray", value: "gray", hex: "#6B7280" },
    { name: "Navy", value: "navy", hex: "#1E3A8A" },
    { name: "Blue", value: "blue", hex: "#3B82F6" },
  ];

  const handleNextPage = () => {
    setVisibleCount(visibleCount + 6);
  };

  const ProductCard = ({ product }) => (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={product.images.side}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              -
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              %
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-1">
          {product.category.toUpperCase()}
        </p>
        <h3 className="font-semibold text-gray-900 mb-3">{product.name}</h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.promoPrice}
          </span>
          {product.price && (
            <span className="text-lg text-gray-500 line-through">
              ${product.price}
            </span>
          )}
        </div>

        {/* <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div 
                key={index}
                className="w-4 h-4 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: colors.find(c => c.value === color)?.hex || color }}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.sizes.length} sizes
          </span>
        </div> */}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <span>Home</span>
          <span>/</span>
          <span className="text-gray-900">Shop</span>
        </div>
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-12 mb-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4">
              Find Clothes That Match Your Style
            </h1>
            <p className="text-xl mb-8 max-w-2xl opacity-90">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <Count />
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent via-transparent to-black/20"></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl p-6 lg:sticky lg:top-24">
              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Categories</h4>
                <div className="space-y-3" id="folder">
                  <button
                    onClick={() => handleCategory("All Products")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === "all"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-sm opacity-75">
                      ({products?.length || 0})
                    </span>
                  </button>

                  <button
                    onClick={() => handleCategory("New Arrival")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === "New Arrival"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span>New Arrivals</span>
                    <span className="text-sm opacity-75">
                      ({products?.filter((p) => p.isNewArrival)?.length || 0})
                    </span>
                  </button>

                  <button
                    onClick={() => handleCategory("Popular")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === "popular"
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span>Most Popular</span>
                    <span className="text-sm opacity-75">
                      ({products?.filter((p) => p.isPopular)?.length || 0})
                    </span>
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategory(category.category)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.category
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span>{category.category}</span>
                      <span className="text-sm opacity-75">
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Price Range</h4>
                <div className="px-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              {/* Colors */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Colors</h4>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        setSelectedColors((prev) =>
                          prev.includes(color.value)
                            ? prev.filter((c) => c !== color.value)
                            : [...prev, color.value]
                        );
                      }}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColors.includes(color.value)
                          ? "border-black scale-110"
                          : "border-gray-200"
                      } transition-all`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              {/* Sizes */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Sizes</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSizes((prev) =>
                          prev.includes(size)
                            ? prev.filter((s) => s !== size)
                            : [...prev, size]
                        );
                      }}
                      className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSizes.includes(size)
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedCategory}</h2>
                <p className="text-gray-600">
                  Showing {visibleCount} of {filteredProductsState.length}{" "}
                  {/* Showing {filteredProductsState.length} of {products.length}{" "} */}
                  products
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={handleSortBy}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="New Arrival">New Arrival</option>
                    <option value="category">category</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
                <div className="flex border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-black text-white"
                        : "text-gray-600"
                    } transition-colors`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-black text-white"
                        : "text-gray-600"
                    } transition-colors`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            {/* Products Grid */}
            {isLoading ? (
              <div>
                <Loader viewMode={viewMode} />
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {filteredProductsState?.slice(0, visibleCount).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {visibleCount < filteredProductsState?.length && (
                  <div className="text-center mt-12">
                    <button
                      className="bg-white border-2 border-black text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-colors"
                      onClick={handleNextPage}
                    >
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Shop;
