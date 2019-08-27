const deleteProduct = btn => {
  const prodId = btn.parentNode.querySelector("[name=productId]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;

  const productCart = btn.closest("article");

  fetch(`/admin/product/${prodId}`, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf
    }
  })
    .then(result => {
      return result.json();
    })
    .then(data => {
      console.log(data);
      //modern browsers
      productCart.remove();

      //all browsers
      // productCart.parentNode.removeChild(productCart);
    })
    .catch(err => console.log(err));
};
