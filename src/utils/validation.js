export const validateProduct = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Tên sản phẩm không được để trống';
    if (!values.price || isNaN(values.price)) errors.price = 'Giá không hợp lệ';
    if (!values.categoryId) errors.categoryId = 'Chọn một danh mục';
    return errors;
  };
  
  export const validateCategory = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Tên danh mục không được để trống';
    return errors;
  };
  