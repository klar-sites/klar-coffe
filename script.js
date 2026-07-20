// ============================================================
// script.js — Roastline Coffee Subscription
// Handles: theme toggle, mobile nav toggle, FAQ accordion.
// ============================================================

(function () {
  'use strict';

  // ---------- Theme Toggle ----------
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const htmlEl = document.documentElement;

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (iconSun && iconMoon) {
      iconSun.style.display = theme === 'dark' ? 'none' : 'block';
      iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
    }
    try {
      localStorage.setItem('roastline-theme', theme);
    } catch (e) {}
  }

  function initTheme() {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('roastline-theme');
    } catch (e) {}

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = htmlEl.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ---------- Mobile Nav Toggle ----------
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const navMenu = document.getElementById('nav-menu');

  function closeNav() {
    if (nav) nav.setAttribute('data-open', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  function openNav() {
    if (nav) nav.setAttribute('data-open', 'true');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.getAttribute('data-open') === 'true';
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close mobile menu when a link is clicked
    if (navMenu) {
      navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeNav);
      });
    }

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    const button = item.querySelector('.faq__q');
    if (!button) return;

    button.addEventListener('click', function () {
      const isOpen = item.getAttribute('data-open') === 'true';

      // Close all items
      faqItems.forEach(function (otherItem) {
        otherItem.setAttribute('data-open', 'false');
        const otherButton = otherItem.querySelector('.faq__q');
        if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      });

      // Open the clicked one if it was previously closed
      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---------- Init ----------
  initTheme();
})();
