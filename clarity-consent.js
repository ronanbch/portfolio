(function () {
	"use strict";

	var CLARITY_PROJECT_ID = "ybwu3d1ak3";
	var CONSENT_KEY = "clarity_consent";

	function loadClarity() {
		(function (c, l, a, r, i, t, y) {
			c[a] = c[a] || function () {
				(c[a].q = c[a].q || []).push(arguments);
			};
			t = l.createElement(r);
			t.async = 1;
			t.src = "https://www.clarity.ms/tag/" + i;
			y = l.getElementsByTagName(r)[0];
			y.parentNode.insertBefore(t, y);
		})(window, document, "clarity", "script", CLARITY_PROJECT_ID);
	}

	function showBanner() {
		var english = document.documentElement.lang.toLowerCase().split('-')[0] === 'en';
		var message = english
			? 'This site uses anonymized audience measurement cookies (click and scroll maps) to understand how the site is used. No personal tracking data is involved.'
			: "Ce site utilise des cookies de mesure d'audience anonymisée (cartes de clics/défilement) pour comprendre comment ce site est utilisé. Aucune donnée de suivi personnel n'est concernée.";
		var banner = document.createElement("div");
		banner.className = "cookie-banner";
		banner.innerHTML =
			'<div class="cookie-banner-content">' +
			'<p>' + message + '</p>' +
			'<div class="cookie-banner-buttons">' +
			'<div class="button button-tertiary" id="cookie-decline" role="button" tabindex="0">' + (english ? 'Decline' : 'Refuser') + '</div>' +
			'<div class="button button-primary" id="cookie-accept" role="button" tabindex="0">' + (english ? 'Accept' : 'Accepter') + '</div>' +
			"</div>" +
			"</div>";
		document.body.appendChild(banner);

		function accept() {
			localStorage.setItem(CONSENT_KEY, "accepted");
			loadClarity();
			banner.remove();
		}
		function decline() {
			localStorage.setItem(CONSENT_KEY, "declined");
			banner.remove();
		}

		var acceptBtn = document.getElementById("cookie-accept");
		var declineBtn = document.getElementById("cookie-decline");

		acceptBtn.addEventListener("click", accept);
		declineBtn.addEventListener("click", decline);
		acceptBtn.addEventListener("keydown", function (e) {
			if (e.key === "Enter" || e.key === " ") { e.preventDefault(); accept(); }
		});
		declineBtn.addEventListener("keydown", function (e) {
			if (e.key === "Enter" || e.key === " ") { e.preventDefault(); decline(); }
		});
	}

	document.addEventListener("DOMContentLoaded", function () {
		var stored = localStorage.getItem(CONSENT_KEY);
		if (stored === "accepted") {
			loadClarity();
		} else if (stored !== "declined") {
			showBanner();
		}
	});
})();
