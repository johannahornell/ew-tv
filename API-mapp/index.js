//webkey: hxuVvZ5eJUhU3j5iXiE9dH72JjFZJyoXQtry7Gp1ZYjnQw1P3T

//GET all Projects, missions,quests and side-quests from Teamwork API
var company = "sphinxly";
var key = "twp_sDtrikbLENdHRgWs4vYMvHspE26B";
var action = "projects.json?orderby=lastActivityDate";

$("#btn").click(function() {
  console.log("ajax");
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://" + company + ".teamwork.com/" + action,
    headers: { Authorization: "BASIC " + window.btoa(key + ":xxx") },
    success: function(data) {
      console.log(data.projects);
      //Employees
      var nameList = [
        "- ALEX",
        "- CLAES",
        "- DANNE",
        "- HIMON",
        "- HOSSEIN",
        "- ISAK",
        "- JOHANNAH",
        "- LIAM",
        "- MARIELLE",
        "- PATRIK",
        "- PETER",
        "- ROBERT",
        "- SARA"
      ];

      /* ----------------------------------------------------------------------------------------------------------------------------------------- */

      var allUsersInAMissionProject = data.projects // För alla projekt

        .filter(p => p.tags.filter(t => t.name == "MISSIONS").length > 0) // Filtrera ut alla projekt som har en tag med namnet MiSSION -> Vi kommer ha en lista med bara projekt som har missions

        .flatMap(p => p.tags) // Mappa tagsen i alla dessa projekt till en lång lista   map => [][][] => []

        .filter(t => nameList.indexOf(t.name) > -1); // Filtrera alla dessa namn på de som finns i namnlistan.
      //console.log(allUsersInAMissionProject);
      var missionCountPerUser = allUsersInAMissionProject.map(t => ({
        // Joina alla namn med antal missions som finns för deras namn
        name: t.name,
        missionCount: allUsersInAMissionProject.filter(t2 => t2.name === t.name) // Hämta alla missions där en tagg med rätt namn finns för att få count
          .length
      }));
      //console.log(missionCountPerUser);

      //Filter the object array and take out single user with mission count
      var missionArray = [];
      missionCountPerUser.filter(function(item) {
        var i = missionArray.findIndex(x => x.name == item.name);
        if (i <= -1) {
          missionArray.push({
            name: item.name,
            missionCount: item.missionCount
          });
        }
        return null;
      });
      //console.log(resArr);

      //Loop the array and append to element
      jQuery.each(missionArray, function(index, missionCountArray) {
        $(".missions").append(
          "<li>" +
            missionCountArray.name +
            " - " +
            missionCountArray.missionCount +
            "</li>"
        );
      });

      /* ----------------------------------------------------------------------------------------------------------------------------------------- */

      //Filtrera ut Quests, samma kod som ovan
      var allUsersInAQuestProject = data.projects

        .filter(
          project =>
            project.tags.filter(tags => tags.name == "QUESTS").length > 0
        )

        .flatMap(project => project.tags) // Mappa tagsen i alla dessa projekt till en lång lista   map => [][][] => []

        .filter(tags => nameList.indexOf(tags.name) > -1); // Filtrera alla dessa namn på de som finns i namnlistan.
      //console.log(allUsersInAQuestProject);
      var questCountUser = allUsersInAQuestProject.map(tag => ({
        // Joina alla namn med antal missions som finns för deras namn
        name: tag.name,
        questCount: allUsersInAQuestProject.filter(
          questTag => questTag.name === tag.name
        ).length // Hämta alla missions där en tagg med rätt namn finns för att få count
      }));
      //console.log(questCountUser);

      //Filter the object array and take out single user with mission count
      var questArray = [];
      questCountUser.filter(function(item) {
        var i = questArray.findIndex(x => x.name == item.name);
        if (i <= -1) {
          questArray.push({ name: item.name, questCount: item.questCount });
        }
        return null;
      });
      //console.log(questArray);

      //Loop the array and append to element
      jQuery.each(questArray, function(index, questCountArray) {
        $(".quests").append(
          "<li>" +
            questCountArray.name +
            " - " +
            questCountArray.questCount +
            "</li>"
        );
      });

      /* ----------------------------------------------------------------------------------------------------------------------------------------- */

      var statusLate = data.projects
        .filter(project => project.subStatus == "late")
        .map(lateSite => lateSite.name);

      $(".late").html("Number of late sites:" + statusLate.length);

      jQuery.each(statusLate, function(index, lateSite) {
        $(".late").append("<li>Late sites:" + lateSite + "</li>");
      });

      /* ----------------------------------------------------------------------------------------------------------------------------------------- */

      //Store array in call then slice the last 5(latest) then loop and show
      var call = data.projects;
      var t5 = call.slice(-10);
      console.log(t5);
      //Loop the projects and append to the list
      jQuery.each(t5, function(index, arrayItem) {
        $(".list").append(
          "<ul class=hej>" +
            "<li>" +
            arrayItem.company.name +
            "</li>" +
            "<li>" +
            " Created on: " +
            arrayItem["created-on"] +
            "</li>" +
            "<li>" +
            " Last changed: " +
            arrayItem["last-changed-on"] +
            "</li>" +
            "<li>" +
            " Status: " +
            arrayItem.subStatus +
            "</li>" +
            "<li>" +
            " Description: " +
            arrayItem.description +
            "</li>" +
            "</ul>"
        );
      });
    }
  });
});

/* ----------------------------------------------------------------------------------------------------------------------------------------- */

//Easyweb API Get users and lastseeen
var urlUsers = "http://local.easyweb.se/internalapi/easywebtv/loggedinusers";
var urlSites = "http://local.easyweb.se/internalapi/easywebtv/unionstatistics";

$.ajax({
  type: "GET",
  url: urlUsers,
  dataType: "json",

  success: function(data) {
    jQuery.each(data, function(index, user) {
      $(".logged-in").append(
        "<li>" + user.userName + "</li>",
        "<li>" + user.lastSeen + "</li> <br>"
      );
    });
  }
});

//Easyweb API get site statistics
$.ajax({
  type: "GET",
  url: urlSites,
  dataType: "json",

  success: function(data) {
    jQuery.each(data, function(index, site) {
      $(".stats").append(
        "<li> Site name: " + site.name + "</li>",
        "<li>Site URL: " + site.url + "</li>",
        "<li>Site count: " + site.count + "</li> <br>"
      );
    });
  }
});

/* ----------------------------------------------------------------------------------------------------------------------------------------- */

//GET all the ticket counts from teamwork API
var apiKey = "hxuVvZ5eJUhU3j5iXiE9dH72JjFZJyoXQtry7Gp1ZYjnQw1P3T";
var inboxAction = "v1/inboxes.json";

function refresh() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://" + company + ".teamwork.com/desk/" + inboxAction,
    headers: { Authorization: "BASIC " + window.btoa(apiKey + ":xxx") },
    success: function(data) {
      $(".tickets").html(
        "<li>New: " +
          data.inboxes[0].ticketCounts.new +
          "</li>\
        <li> Assigned: " +
          data.inboxes[0].ticketCounts.assigned +
          "</li>\
        <li>Waiting: " +
          data.inboxes[0].ticketCounts.waiting +
          "</li>\
        <li> On-Hold: " +
          data.inboxes[0].ticketCounts["on-hold"] +
          "</li><br>"
      );
    }
  });
}

setInterval(function() {
  console.log("tick");
  refresh();
}, 2000);
