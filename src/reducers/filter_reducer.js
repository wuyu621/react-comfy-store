import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: action.payload,
      filtered_products: action.payload,
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let newProducts = [...filtered_products];
    if (sort === "price-lowest") {
      newProducts = filtered_products.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      newProducts = filtered_products.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      newProducts = filtered_products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      newProducts = filtered_products.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return {
      ...state,
      filtered_products: newProducts,
    };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const {
      filters: { text, category, company, color, price, shipping },
      all_products,
    } = state;
    let newProducts = [...all_products];
    //text filter
    if (text) {
      newProducts = newProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }

    //category filter
    if (category !== "all") {
      newProducts = newProducts.filter(
        (product) => product.category === category
      );
    }
    //company filter
    if (company !== "all") {
      newProducts = newProducts.filter(
        (product) => product.company === company
      );
    }
    //color filter
    if (color !== "all") {
      newProducts = newProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }
    //free ship filter
    if (shipping) {
      newProducts = newProducts.filter((product) => product.shipping === true);
    }
    //price filter
    newProducts = newProducts.filter((product) => product.price <= price);

    return {
      ...state,
      filtered_products: newProducts,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        color: "all",
        category: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
