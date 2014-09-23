/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 $(document).ready(function(){
    $("#btnConsultar").click(restConsultar);
    $("#btnConsultarTodos").click(restConsultarTodos);
});

 function onDeviceReady() {
    console.log("Entering index.html.onDeviceReady");
    restConsultar();
    restConsultarTodos();
    console.log("Exiting index.html.onDeviceReady");
}

function restConsultar(){ 
    console.log("Entering restConsultar()");
    $.ajax({
        url : "http://www.thomas-bayer.com/sqlrest/CUSTOMER/"+$('#txtNombre').val(),
        dataType:"xml",
        cache: false,
        error:function (xhr, ajaxOptions, thrownError){
            debugger;
            alert(xhr.statusText);
            alert(thrownError);
        },
        success : function(xml) {
            console.log("Entering restConsultar.success()");

            var html = "<li><a class=\"ui-btn ui-icon-carat-r\" href=\"#\">"+$(xml).find("CUSTOMER").find("FIRSTNAME").text()+" "+$(xml).find("CUSTOMER").find("LASTNAME").text()+"</a></li>";
            $('#respuesta').html(html);
            console.log("Exiting restConsultar.success()");
        }
    });
    console.log("Exiting restConsultar()");
};

function restConsultarTodos(){ 
    console.log("Entering restConsultarTodos()");
    $.ajax({
        url : "http://www.thomas-bayer.com/sqlrest/CUSTOMER/",
        dataType:"xml",
        cache: false,
        error:function (xhr, ajaxOptions, thrownError){
            debugger;
            alert(xhr.statusText);
            alert(thrownError);
        },
        success : function(xml) {
            console.log("Entering restConsultarTodos.success()");
            $('#respuesta').empty();
                $(xml).find("CUSTOMERList").find("CUSTOMER").each(function() {
                 $.ajax({
                    url : "http://www.thomas-bayer.com/sqlrest/CUSTOMER/"+$(this).text(),
                    dataType:"xml",
                    cache: false,
                    error:function (xhr2, ajaxOptions2, thrownError2){
                        debugger;
                        alert(xhr2.statusText);
                        alert(thrownError2);
                    },
                    success : function(xml2) {
                        console.log("Entering 2 success()");

                        var html = "<li><a class=\"ui-btn ui-icon-carat-r\" href=\"#\">"+$(xml2).find("CUSTOMER").find("FIRSTNAME").text()+" "+$(xml2).find("CUSTOMER").find("LASTNAME").text()+"</a></li>";
                        $('#respuesta').append(html);
                        console.log("Exiting 2 success()");
                    }
                });




             });

                console.log("Exiting restConsultarTodos.success()");
            }
        });
console.log("Exiting restConsultarTodos()");
};
