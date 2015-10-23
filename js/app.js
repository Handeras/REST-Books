/**
 * Created by pc on 2015-10-23.
 */



var addBookOnPage = function(bookData){
    var book = $("<div class='book' data-id='" + bookData.id + "'>" +
    "<h2>" + bookData.name + "</h2>" +
    "<p>" + bookData.autor + "</p>" +
    "<p>" + bookData.description + "</p>" +
    "<button>Usun</button>" +
    "</div>");

    book.children().not("h2").hide();
    book.children("h2").click(function(event){
       $(this).siblings().not("h2").toggle();
    });

    book.children("button").click(function(event){
        $.ajax({
           url: "http://api.coderslab.pl/book/" + $(this).parent().data().id,
            type: "DELETE",
            dataType: "json",
            success: function(json){
                loadAllBooks();
            },
            error: function(xhr, status, errorThrown){
                console.log("Nie udalo sie usuanc");
            }
        });
    });

    $("#allBooks").append(book);
};

var loadAllBooks = function(){
    $.ajax({
        url: "http://api.coderslab.pl/book",
        type: "GET",
        dataType: "json",
        success: function(json){
            $("#allBooks").empty();
            json.forEach(function(element, index, array){
               addBookOnPage(element);
            });
        },
        error: function(xhr, status, errorThrown){
            console.log("Nie udalo sie");
        }
    });
};

var addBook = function(){

};

$(document).ready(function(){
    loadAllBooks();

    $("#newBookForm input:last-child").click(function(){
        console.log("Udalo sie");
    })
});