<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="/style.css" />
    <title>Computer Store</title>
  </head>
  <body>
    <div class="row">
      <div class="col-lg-4 col-md-12 col-sm-12 form-box">
        <form class="form" name="form" method="POST" enctype="multipart/form-data">
          <input type="hidden" class="id" data-image-name="" />
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control name" placeholder="Name" name="name" autocomplete="off" autofocus />
            <p class="err name-err"></p>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="text" class="form-control price" placeholder="Price" />
            <p class="err price-err"></p>
            <input type="file" name="image" class="image mb-3" />
          </div>
          <button id="add" class="btn btn-primary add" type="button">Add New</button>
          <button class="btn btn-outline-secondary cancel" type="button">Cancel</button>
          <p class="err update-err"></p>
        </form>
      </div>
      <div class="col-lg-8 col-md-12 col-sm-12">
        <div class="input-box">
          <input type="text" class="form-control search" placeholder="Search by name" />
        </div>
        <div class="main-content">
          <div class="alert"></div>
          <p class="counter">Total: <span class="total"></span></p>
          <div class="content-box"></div>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
