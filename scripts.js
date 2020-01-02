$(document).ready(function() {
  let bookList = new Array();
  let booksPerPage = 6;
  let currentPage = 1;
  let totalPages;
  let listLength;

  function makeList() {
    for (x = 1; x < 21; x++)
      bookList.push({
        bookId: x,
        title: "Book " + x,
        authorName: "Author " + x
      });
    bookList = bookList;
    listLength = bookList.length;
    totalPages = Math.ceil(listLength / booksPerPage);
  }

  function displayTable() {
    let startIndex = (currentPage - 1) * booksPerPage;
    let endIndex = startIndex + booksPerPage;
    let pageList = bookList.slice(startIndex, endIndex);
    let html = "";
    for (let i = 0; i < pageList.length; i++) {
      html += "<tr>";
      html += "<td>" + pageList[i].bookId + "</td>";
      html += "<td>" + pageList[i].title + "</td>";
      html += "<td>" + pageList[i].authorName + "</td>";
      html += "</tr>";
    }
    $("#bookTable").html(html);
  }

  $("ul.pagination").on("click", function(e) {
    let input = $(e.target).text();
    if (!isNaN(input)) {
      currentPage = parseInt(input);
      $("ul li a.active").removeClass("active");
      displayPagination();
      displayTable();
    } else if ((input == "<") & (currentPage != 1)) {
      currentPage -= 1;
      $("ul li a.active").removeClass("active");
      displayPagination();
      displayTable();
    } else if ((input == ">") & (currentPage != totalPages)) {
      currentPage += 1;
      $("ul li a.active").removeClass("active");
      displayPagination();
      displayTable();
    }
    check();
  });

  function displayPagination() {
    let list = "";
    if (currentPage === 1) {
      for (let i = 1; i <= totalPages; i++) {
        list += "<li><a href='#'>" + i + "</a></li>";
      }
      list += "<li><a href='#'>></a></li>";
      $("ul").html(list);
      $("ul li a:first").addClass("active");
    } else if (currentPage === totalPages) {
      list += "<li><a href='#'><</a></li>";
      for (let i = 1; i <= totalPages; i++) {
        list += "<li><a href='#'>" + i + "</a></li>";
      }
      $("ul").html(list);
      $("ul li a:last").addClass("active");
    } else {
      let list = "<li><a href='#'><</a></li>";
      for (let i = 1; i <= totalPages; i++) {
        list += "<li><a href='#'>" + i + "</a></li>";
      }
      list += "<li><a href='#'>></a></li>";
      $("ul").html(list);
      $("ul li a:eq(" + currentPage + ")").addClass("active");
    }
  }
  
  function onLoad() {
    makeList();
    displayPagination();
    displayTable();
  }

  onLoad();
});
