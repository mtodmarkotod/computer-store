$(document).ready(function () {
  //=======================================
  //           FUNCTIONS
  //=======================================

  function clearInputs() {
    $(".name").val("")
    $(".price").val("")
    $(".image").val("")
  }

  function clearInputsErrMessages() {
    $(".name-err").html("")
    $(".price-err").html("")
  }

  //SHOW FULL LIST OF ITEMS FROM DATABASE
  function showItems() {
    $.ajax({
      type: "POST",
      url: "display_items.php",
      success: function (res) {
        $(".content-box").html(res)
      }
    })

    displayNumberOfItems()
  }

  //DISPLAY TOTAL NUMBER OF STORED/SAVED ITEMS
  function displayNumberOfItems() {
    $.ajax({
      type: "POST",
      url: "total.php",
      success: function (res) {
        $(".total").html(res)
      }
    })
  }

  //SHOW CONFIRM MESSAGE TO USER
  function showMsgToUser(class_name, action_msg) {
    $(".alert").attr("class", `alert ${class_name}`).html(action_msg)
  }

  //REMOVE CONFIRM MSG AFTER SOME TIME
  function removeMsgAfterSomeTime(class_name, action_msg) {
    setTimeout(function () {
      $(".alert").attr("class", `alert ${class_name}`).html(action_msg)
    }, 30000)
  }

  //INPUT REQUIREMENTS
  var letterNumber = /^[0-9a-zA-Z ]+$/
  var numbers = /^[0-9.]+$/

  //FORM VALIDATION
  function checkInputRequirements(name, price) {
    if (name == "") {
      $(".name-err").html("Field can not be empty")
    } else {
      $(".name-err").html("")
    }
    if (price == "") {
      $(".price-err").html("Field can not be empty")
    } else {
      $(".price-err").html("")
    }
    if (price && !price.match(numbers)) {
      $(".price-err").html("Only numbers and dots alowed")
    }
    if (name && !name.match(letterNumber)) {
      $(".name-err").html("Only letters and numbers alowed")
    }
  }

  //=========================================================================================================//

  //***************************//
  //           SHOW            //
  //***************************//

  showItems()

  //========================================================================================================//

  //***************************//
  //       CREATE/SAVE         //
  //***************************//

  $(document).on("click", ".add", function (e) {
    e.preventDefault()

    var add = "add"
    var name = $(".name").val().toLowerCase()
    var price = $(".price").val()
    var file = $(".image")[0].files[0]
    console.log(file)

    checkInputRequirements(name, price)

    //CHECKING IF FORM INPUTS MATCH REQUIREMENTS
    if (name && price && name.match(letterNumber) && price.match(numbers)) {
      var data = new FormData()
      data.append("name", name)
      data.append("price", price)
      data.append("image", file)
      data.append("add", add)

      // var data = {
      //   name,
      //   price,
      //   add,
      //   fileName: file.name
      // }
      // var contentType = {
      //   headers: {
      //     "content-type": "multipart/form-data"
      //   }
      // }
      // axios
      //   .post("/create", data, contentType)
      //   .then(function (response) {
      //     console.log(response)
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
      $.ajax({
        type: "POST",
        url: "/create",
        processData: false,
        contentType: false,
        data: data,
        success: function (res) {
          clearInputs()
          showItems()
          showMsgToUser("alert-success", "Inserted successfully")
          removeMsgAfterSomeTime("", "")
        },
        error: function (err) {
          showMsgToUser("alert-danger", "Problem with database. Please try latter")
        }
      })
    }
  })

  //===========================================================================================================//

  //***************************//
  //          SEARCH           //
  //***************************//

  $(".search").keyup(function () {
    var inputValue = $(".search").val().toLowerCase()

    function search() {
      //GET LIST OF FOUND ITEMS
      $.ajax({
        type: "POST",
        url: "search_items.php",
        data: { inputValue: inputValue },
        success: function (res) {
          $(".content-box").html(res)
          displayNumberOfItems()
        }
      })

      //GET NUMBER OF FOUND ITEMS
      $.ajax({
        type: "POST",
        url: "found_items.php",
        dataType: "JSON",
        data: { inputValue: inputValue },
        success: function (res) {
          if (inputValue == "") {
            showMsgToUser("", "")
          } else if (res.number > 0) {
            showMsgToUser("alert-success", `Found ${res.number}`)
          } else {
            showMsgToUser("alert-warning", "Item not exists")
          }
        }
      })
    }

    clearTimeout(search)
    setTimeout(search, 750)
  })

  //==================================================================================================//

  //***************************//
  //           EDIT            //
  //***************************//

  $(document).on("click", ".edit", function () {
    $(".add").html("Update").removeClass("add").addClass("update")
    clearInputsErrMessages()

    var edit = "edit"
    var id = $(this).data("id")
    var image_name = $(this).attr("alt")

    $.ajax({
      type: "POST",
      url: "edit.php",
      dataType: "JSON",
      data: { id: id, edit: edit, imageName: image_name },
      success: function (res) {
        $(".id").val(res.id)
        $(".id").attr("data-image-name", res.image)
        $(".name").val(res.name)
        $(".price").val(res.price)

        var obj = {
          name: res.name,
          price: res.price
        }

        localStorage.setItem("data", JSON.stringify(obj))
      }
    })
  })

  //==================================================================================================//

  //***************************//
  //          UPDATE           //
  //***************************//

  $(document).on("click", ".update", function () {
    var update = "update"
    var id = $(".id").val()
    var name = $(".name").val()
    var price = $(".price").val()
    var image_name = $(".id").attr("data-image-name")
    var new_image = $(".image")[0].files[0]

    checkInputRequirements(name, price)

    //  GET DATA FROM EDIT ACTION
    var obj = JSON.parse(localStorage.getItem("data"))

    // CHECK IF INPUTS HAVE SAME VALUES AS STORED IN DATABASE
    if (name == obj.name || price == obj.price) {
      $(".update-err").html("Please change name or price")
    }

    if (name != obj.name || (price != obj.price && name.match(letterNumber) && price.match(numbers))) {
      $(".update-err").html("")

      //SET DEFAULT CLASS TO SUBMIT BTN
      $(".update").html("Add New").addClass("add").removeClass("update")

      var data = new FormData()
      data.append("update", update)
      data.append("id", id)
      data.append("name", name)
      data.append("price", price)
      data.append("image_name", image_name)
      data.append("new_image", new_image)

      $.ajax({
        type: "POST",
        url: "update.php",
        processData: false,
        contentType: false,
        data: data,
        success: function (res) {
          showMsgToUser("alert-success", "Updated successfully")
          clearInputs()
          showItems()
          removeMsgAfterSomeTime("", "")
        }
      })
    }
  })

  //==================================================================================================//

  //***************************//
  //          DELETE           //
  //***************************//

  $(document).on("click", ".delete", function () {
    //SET SUBMIT BUTTON TO DEFAULT CLASS
    var add = $("#add")
    add.removeClass("update").addClass("add").html("Add New")

    $(".name").val("")
    $(".price").val("")
    var btn = $(this)

    var img_src = $(this).parent().parent().children(":first-child").attr("src")

    var del = "delete"
    var id = $(this).data("id")

    $.ajax({
      type: "POST",
      url: "delete.php",
      data: {
        id: id,
        delete: del,
        src: img_src
      },
      success: function (res) {
        showMsgToUser("alert-danger", "Deleted successfully")
        btn.parent().parent().remove()
        displayNumberOfItems()
        removeMsgAfterSomeTime("", "")
      }
    })
  })

  //================================================================================================//

  //***************************//
  //          CANCEL           //
  //***************************//

  $(".cancel").on("click", function () {
    clearInputs()
    clearInputsErrMessages()
    showItems()
    removeMsgAfterSomeTime("", "")
    $(".update").html("Add New").addClass("add").removeClass("update")
  })
})
