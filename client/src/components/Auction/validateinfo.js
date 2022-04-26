export default function validateInfo(values) {
  let errors = {};

  if (!values.productName) {
    errors.productName = "Product Name is required";
  }

  if (!values.description) {
    errors.description = "Description is required";
  }
  if (!values.BasedPrice) {
    errors.BasedPrice = "based price is required";
  }

  if (!values.category) {
    errors.category = "Category is required";
  }

  if (!values.duration) {
    errors.duration = "Duration is required";
  }

  return errors;
}
