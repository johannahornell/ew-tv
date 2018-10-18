// Highchart Pie
$(function () {

    var pieChart = Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 220
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Mobile',
                y: 20,
                color: '#8500b6',
                sliced: true,
                selected: true
            }, {
                name: 'Desktop',
                y: 80,
                color: '#adadad',
            }]
        }]
    });
});

// Dates for display
var today = new Date();
var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

//webkey: hxuVvZ5eJUhU3j5iXiE9dH72JjFZJyoXQtry7Gp1ZYjnQw1P3T

//GET all Projects, missions,quests and side-quests from Teamwork API
var company = "sphinxly";
var key = "twp_sDtrikbLENdHRgWs4vYMvHspE26B";
var action = "projects.json?orderby=lastActivityDate";

console.log("ajax");
$.ajax({
    type: "GET",
    dataType: "json",
    url: "https://" + company + ".teamwork.com/" + action,
    headers: { Authorization: "BASIC " + window.btoa(key + ":xxx") },
    success: function (data) {
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

        var allUsersInAMissionProject = data.projects // F�r alla projekt

            .filter(p => p.tags.filter(t => t.name == "MISSIONS").length > 0) // Filtrera ut alla projekt som har en tag med namnet MiSSION -> Vi kommer ha en lista med bara projekt som har missions

            .flatMap(p => p.tags) // Mappa tagsen i alla dessa projekt till en l�ng lista   map => [][][] => []

            .filter(t => nameList.indexOf(t.name) > -1); // Filtrera alla dessa namn p� de som finns i namnlistan.
        //console.log(allUsersInAMissionProject);
        var missionCountPerUser = allUsersInAMissionProject.map(t => ({
            // Joina alla namn med antal missions som finns f�r deras namn
            name: t.name,
            missionCount: allUsersInAMissionProject.filter(t2 => t2.name === t.name) // H�mta alla missions d�r en tagg med r�tt namn finns f�r att f� count
                .length
        }));
        //console.log(missionCountPerUser);

        //Filter the object array and take out single user with mission count
        var missionArray = [];
        missionCountPerUser.filter(function (item) {
            var i = missionArray.findIndex(x => x.name == item.name);
            if (i <= -1) {
                missionArray.push({
                    name: item.name,
                    missionCount: item.missionCount
                });
            }
            return null;
        });

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
        questCountUser.filter(function (item) {
            var i = questArray.findIndex(x => x.name == item.name);
            if (i <= -1) {
                questArray.push({ name: item.name, questCount: item.questCount });
            }
            return null;
        });
        function getTotals() {
            var totalMissions = data.projects // För alla projekt
                // Filtrera ut alla projekt som har en tag med namnet MiSSION -> Vi kommer ha en lista med bara projekt som har missions
                .filter(p => p.tags.filter(t => t.name == "MISSIONS").length > 0)

            document.getElementById("mission-amount").innerHTML = totalMissions.length;
            document.getElementById("ewtv-mission-amount").innerHTML = totalMissions.length;

            var totalQuests = data.projects // För alla projekt

                .filter(p => p.tags.filter(t => t.name == "QUESTS").length > 0)

            document.getElementById("quest-amount").innerHTML = totalQuests.length;

            var totalSeo = data.projects // För alla projekt

                .filter(p => p.tags.filter(t => t.name == "SEO").length > 0) // Filtrera ut alla projekt som har en tag med namnet SEO

            document.getElementById("seo-customers").innerHTML = totalSeo.length;
        }
        setInterval(function () {
            getTotals();
        }, 2000);

        var totalMissions = data.projects // För alla projekt

            .filter(p => p.tags.filter(t => t.name == "MISSIONS").length > 0); // Filtrera ut alla projekt som har en tag med namnet MiSSION -> Vi kommer ha en lista med bara projekt som har missions

        var totalQuests = data.projects // För alla projekt

            .filter(p => p.tags.filter(t => t.name == "QUESTS").length > 0); // Filtrera ut alla projekt som har en tag med namnet QUESTS -> Vi kommer ha en lista med bara projekt som har missions



        function testing() {
            missionArray.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            questArray.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }
        testing();

        var filtered = [];

        for (var quest in questArray) {
            for (var mission in missionArray) {
                if (questArray[quest].name == missionArray[mission].name) {
                    filtered.push({
                        name: missionArray[mission].name,
                        missionCount: missionArray[mission].missionCount,
                        questCount: questArray[quest].questCount
                    });
                }
            }
        }
        console.log(filtered);
        jQuery.each(filtered, function (index, sum) {

            $(".top-team-container").append(
                "<div class='top-team'>" +
                "<span class='top-name'>" + sum.name.slice(2).toLowerCase() + "</span>" +
                "<div class='hexagon-container'>" +
                "<div class='hexagon2 hexagon-mission'>" +
                "<div class='hexagon-text'>" +
                "<span>" + sum.missionCount + "</span>" +
                "</div>" +
                "</div>" +
                "<div class='hexagon2 hexagon-quest'>" +
                "<div class='hexagon-text'>" +
                "<span>" + sum.questCount + "</span>" +
                "</div>" +
                "</div>" +
                "<div class='hexagon2 hexagon-sidequest'>" +
                "<div class='hexagon-text'>" +
                "<span>" + 0 + "</span>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<span class='xp-points'>" + Math.round(345 * sum.missionCount) + "XP</span>" +
                "</div>"
            );

            var $divs = $("div.top-team");
            var numericallyOrderedDivs = $divs.sort(function (a, b) {
                return parseInt($(a).find(".xp-points").text()) < parseInt($(b).find(".xp-points").text());
            });
            $(".top-team-container").html(numericallyOrderedDivs);

        });

        /* ----------------------------------------------------------------------------------------------------------------------------------------- */

        var statusLate = data.projects
            .filter(project => project.subStatus == "late")
            .map(lateSite => lateSite.name);

        $(".late").html("Number of late sites:" + statusLate.length);

        jQuery.each(statusLate, function (index, lateSite) {
            $(".late").append("<li>Late sites:" + lateSite + "</li>");
        });

        /* ----------------------------------------------------------------------------------------------------------------------------------------- */

        //Store array in call then slice the last 5(latest) then loop and show
        var call = data.projects;
        var t5 = call.slice(-12);
        console.log(t5);

        //Loop the projects and append to the list
        jQuery.each(t5, function (index, arrayItem) {

            var dayChanged;

            if (today.getDate() == arrayItem["last-changed-on"].slice(8, 10) && today.getMonth() == (arrayItem["last-changed-on"].slice(5, 7) - 1)) {
                dayChanged = "Idag " + arrayItem["last-changed-on"].slice(11, 16);
            }
            else if (yesterday.getDate() == arrayItem["last-changed-on"].slice(8, 10) && yesterday.getMonth() == arrayItem["last-changed-on"].slice(5, 7) - 1) {
                dayChanged = "Igår " + arrayItem["last-changed-on"].slice(11, 16);
            }
            else {
                dayChanged = arrayItem["last-changed-on"].slice(0, 10) + " " + arrayItem["last-changed-on"].slice(11, 16);
            }

            $(".changes-container").prepend(
                "<div class='latest-changes'>" +
                "<div>" +
                "<img src='images/pages.png' />" +
                "<span class='changes-company'>" +
                arrayItem.company.name +
                "</span > / " +
                "<span class='changes-page'>" +
                        /*arrayItem.description*/ "Sida" +
                "</span >" +
                "</div>" +
                "<span class='changes-time'>" +
                dayChanged +
                "</span >" +
                "</div>"
            );
        });
        $(".changes-container").prepend("<h1>Senast ändrat</h1 >");
    }
});



/* ----------------------------------------------------------------------------------------------------------------------------------------- */

//Easyweb API Get users and lastseeen
var urlUsers = "http://local.easyweb.se/internalapi/easywebtv/loggedinusers";
var urlSites = "http://local.easyweb.se/internalapi/easywebtv/unionstatistics";

$.ajax({
    type: "GET",
    url: urlUsers,
    dataType: "json",

    success: function (data) {
        jQuery.each(data, function (index, user) {
            $(".user-container").append(
                "<p>" + user.userName + "</p>",
                "<p>" + user.lastSeen + "</p> <br>"
            );
        });
    }
});

//Easyweb API get site statistics
$.ajax({
    type: "GET",
    url: urlSites,
    dataType: "json",

    success: function (data) {
        jQuery.each(data, function (index, site) {
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
        success: function (data) {
            document.getElementById("new-amount").innerHTML = data.inboxes[0].ticketCounts.new;
            document.getElementById("assigned-amount").innerHTML = data.inboxes[0].ticketCounts.assigned;
            document.getElementById("sidequest-amount").innerHTML = data.inboxes[0].ticketCounts.assigned;
            document.getElementById("waiting-amount").innerHTML = data.inboxes[0].ticketCounts.waiting;
            document.getElementById("onhold-amount").innerHTML = data.inboxes[0].ticketCounts["on-hold"];
        }
    });
}

//GET all the new tickets from teamwork API
var newInboxAction = "v1/inboxes/2040/tickets/new.json";
function getNewTickets() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://" + company + ".teamwork.com/desk/" + newInboxAction,
        headers: { Authorization: "BASIC " + window.btoa(apiKey + ":xxx") },
        success: function (data) {
            var newInboxData = data.tickets;
            var newInboxSlice = newInboxData.slice(-3);

            $(".newest-new-container").html("");
            jQuery.each(newInboxSlice, function (index, newInbox) {
                var dayChanged;
                if (today.getDate() == newInbox.createdAt.slice(8, 10) && today.getMonth() == (newInbox.createdAt.slice(5, 7) - 1)) {
                    dayChanged = "Idag " + newInbox.createdAt.slice(11, 16);
                }
                else if (yesterday.getDate() == newInbox.createdAt.slice(8, 10) && yesterday.getMonth() == newInbox.createdAt.slice(5, 7) - 1) {
                    dayChanged = "Igår " + newInbox.createdAt.slice(11, 16);
                }
                else {
                    dayChanged = newInbox.createdAt.slice(11, 16) + "<br />" + newInbox.createdAt.slice(0, 10);
                }

                $(".newest-new-container").prepend(
                    "<div class='newest-ticket'>" +
                    "<div class='ticket-info'>" +
                    "<p class='from'>Fr&aring;n: <span>" + newInbox.customer.firstName + "</span></p>" +
                    "<p class='subject'>Subject:</p>" +
                    "<span>" + newInbox.subject + "</span>" +
                    "</div>" +
                    "<div class='ticket-time'>" +
                    "<span>" + dayChanged + "</span>" +
                    "</div>" +
                    "</div >"
                );
            });
        }
    });
}

var assignedInboxAction =
    "v1/inboxes/2040/tickets/Active.json?notAssignedTo[]=-1";
function getAssignedTickets() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://" + company + ".teamwork.com/desk/" + assignedInboxAction,
        headers: { Authorization: "BASIC " + window.btoa(apiKey + ":xxx") },
        success: function (data) {
            var assignedInboxData = data.tickets;
            var assignedInboxSlice = assignedInboxData.slice(-3);

            $(".newest-assigned-container").html("");
            jQuery.each(assignedInboxSlice, function (index, assignedInbox) {

                var dayChanged;
                if (today.getDate() == assignedInbox.createdAt.slice(8, 10) && today.getMonth() == (assignedInbox.createdAt.slice(5, 7) - 1)) {
                    dayChanged = "Idag " + assignedInbox.createdAt.slice(11, 16);
                }
                else if (yesterday.getDate() == assignedInbox.createdAt.slice(8, 10) && yesterday.getMonth() == assignedInbox.createdAt.slice(5, 7) - 1) {
                    dayChanged = "Igår " + assignedInbox.createdAt.slice(11, 16);
                }
                else {
                    dayChanged = assignedInbox.createdAt.slice(11, 16) + "<br />" + assignedInbox.createdAt.slice(0, 10);
                }

                $(".newest-assigned-container").prepend(
                    "<div class='newest-ticket'>" +
                    "<div class='ticket-info'>" +
                    "<p class='from'>Fr&aring;n: <span>" + assignedInbox.customer.firstName + "</span></p>" +
                    "<p class='subject'>Subject:</p>" +
                    "<span>" + assignedInbox.subject + "</span>" +
                    "</div>" +
                    "<div class='ticket-time'>" +
                    "<span>" + dayChanged + "</span>" +
                    "</div>" +
                    "</div >"
                );
            });
        }
    });
}
// assignedInbox.customer.firstName

//GET all the tickets from WAITING inbox
var waitingInboxAction = "v1/inboxes/2040/tickets/waiting.json";
function getWaitingTickets() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://" + company + ".teamwork.com/desk/" + waitingInboxAction,
        headers: { Authorization: "BASIC " + window.btoa(apiKey + ":xxx") },
        success: function (data) {
            var waitingInboxData = data.tickets;
            var waitingInboxSlice = waitingInboxData.slice(-3);

            $(".newest-waiting-container").html("");
            jQuery.each(waitingInboxSlice, function (index, waitingInbox) {

                var dayChanged;
                if (today.getDate() == waitingInbox.createdAt.slice(8, 10) && today.getMonth() == (waitingInbox.createdAt.slice(5, 7) - 1)) {
                    dayChanged = "Idag " + waitingInbox.createdAt.slice(11, 16);
                }
                else if (yesterday.getDate() == waitingInbox.createdAt.slice(8, 10) && yesterday.getMonth() == waitingInbox.createdAt.slice(5, 7) - 1) {
                    dayChanged = "Igår " + waitingInbox.createdAt.slice(11, 16);
                }
                else {
                    dayChanged = waitingInbox.createdAt.slice(11, 16) + "<br />" + waitingInbox.createdAt.slice(0, 10);
                }

                $(".newest-waiting-container").prepend(
                    "<div class='newest-ticket'>" +
                    "<div class='ticket-info'>" +
                    "<p class='from'>Fr&aring;n: <span>" + waitingInbox.customer.firstName + "</span></p>" +
                    "<p class='subject'>Subject:</p>" +
                    "<span>" + waitingInbox.subject + "</span>" +
                    "</div>" +
                    "<div class='ticket-time'>" +
                    "<span>" + dayChanged + "</span>" +
                    "</div>" +
                    "</div >"
                );
            });
        }
    });
}

//GET all the tickets from ON-HOLD inbox
var onHoldInboxAction = "v1/inboxes/2040/tickets/on-hold.json";
function getOnHoldTickets() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://" + company + ".teamwork.com/desk/" + onHoldInboxAction,
        headers: { Authorization: "BASIC " + window.btoa(apiKey + ":xxx") },
        success: function (data) {
            var onHoldInboxData = data.tickets;
            var onHoldInboxSlice = onHoldInboxData.slice(-3);

            $(".newest-onhold-container").html("");
            jQuery.each(onHoldInboxSlice, function (index, onHoldInbox) {

                var dayChanged;
                if (today.getDate() == onHoldInbox.createdAt.slice(8, 10) && today.getMonth() == (onHoldInbox.createdAt.slice(5, 7) - 1)) {
                    dayChanged = "Idag " + onHoldInbox.createdAt.slice(11, 16);
                }
                else if (yesterday.getDate() == onHoldInbox.createdAt.slice(8, 10) && yesterday.getMonth() == onHoldInbox.createdAt.slice(5, 7) - 1) {
                    dayChanged = "Igår " + onHoldInbox.createdAt.slice(11, 16);
                }
                else {
                    dayChanged = onHoldInbox.createdAt.slice(11, 16) + "<br />" + onHoldInbox.createdAt.slice(0, 10);
                }

                $(".newest-onhold-container").prepend(
                    "<div class='newest-ticket'>" +
                    "<div class='ticket-info'>" +
                    "<p class='from'>Fr&aring;n: <span>" + onHoldInbox.customer.firstName + "</span></p>" +
                    "<p class='subject'>Subject:</p>" +
                    "<span>" + onHoldInbox.subject + "</span>" +
                    "</div>" +
                    "<div class='ticket-time'>" +
                    "<span>" + dayChanged + "</span>" +
                    "</div>" +
                    "</div >"
                );
            });
        }
    });
}


setInterval(function () {
    console.log("tick");
    refresh();
    getAssignedTickets();
    getNewTickets();
    getWaitingTickets();
    getOnHoldTickets();
}, 10000)

// Bläddrar mellan tickets
function toggleCurrentTickets(previousCategory, previousContainer, currentCategory, currentContainer) {
    previousCategory.classList.remove("current-category");
    $(previousContainer).slideToggle(1500);

    currentCategory.classList.add("current-category");
    $(currentContainer).slideToggle(1500);
}

setInterval(function () {
    var newTickets = document.getElementById("new-tickets");
    var assignedTickets = document.getElementById("assigned-tickets");
    var waitingTickets = document.getElementById("waiting-tickets");
    var onholdTickets = document.getElementById("onhold-tickets");
    var newContainer = document.getElementById("newest-new-container");
    var assignedContainer = document.getElementById("newest-assigned-container");
    var waitingContainer = document.getElementById("newest-waiting-container");
    var onholdContainer = document.getElementById("newest-onhold-container");

    if (newTickets.classList.contains("current-category")) {
        toggleCurrentTickets(newTickets, newContainer, assignedTickets, assignedContainer);
    }
    else if (assignedTickets.classList.contains("current-category")) {
        toggleCurrentTickets(assignedTickets, assignedContainer, waitingTickets, waitingContainer);
    }
    else if (waitingTickets.classList.contains("current-category")) {
        toggleCurrentTickets(waitingTickets, waitingContainer, onholdTickets, onholdContainer);
    }
    else {
        toggleCurrentTickets(onholdTickets, onholdContainer, newTickets, newContainer);
    }
}, 15000);

/* Alert för möte */
var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
var alertDuration = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 1, 0, 0) - now;
if (millisTill10 < 0) {
    millisTill10 += 86400000;
}
setTimeout(function () {
    document.getElementById("alert").style.display = "flex";
    document.getElementById("alert").style.transform = "scale(1)";
    document.getElementById("alert").style.opacity = "1";
}, millisTill10);
setTimeout(function () {
    document.getElementById("alert").style.display = "none";
}, alertDuration);