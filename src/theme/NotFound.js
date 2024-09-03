import React, { useEffect, useState } from "react";
import NotFound from "@theme-original/NotFound";
import { trackEvent } from "../utils/matomo";
import CustomNotFoundPage from "../pages/notfound";

export default function NotFoundWrapper(props) {
  useEffect(() => {
    trackEvent("404", window.location.pathname);
  }, []);

  const styles = `
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 250px 70px 30px;
  background: linear-gradient(63deg, #3B00B9 0%, #D38ED7 100%);
}

@media (max-width: 991px) {
  .hero-section {
    padding: 100px 20px 0;
  }
}

.content-wrapper {
  width: 100%;
  max-width: 1171px;
}

@media (max-width: 991px) {
  .content-wrapper {
    max-width: 100%;
  }
}

.flex-container {
  display: flex;
  gap: 20px;
}

@media (max-width: 991px) {
  .flex-container {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
}

.text-column {
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 62%;
  margin-left: 0;
}

@media (max-width: 991px) {
  .text-column {
    width: 100%;
  }
}

.headline-container {
  display: flex;
  margin-right: -82px;
  width: 100%;
  flex-direction: column;
  font-family: CircularXX, sans-serif;
  justify-content: flex-start;
}

@media (max-width: 991px) {
  .headline-container {
    max-width: 100%;
  }
}

.text-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  color: var(--White, var(--c-white-000, #fff));
  justify-content: flex-start;
}

@media (max-width: 991px) {
  .text-content {
    max-width: 100%;
  }
}

.error-title {
  width: 100%;
  font-size: 75px;
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 991px) {
  .error-title {
    max-width: 100%;
    font-size: 40px;
  }
}

.error-description {
  font-size: 24px;
  font-weight: 450;
  line-height: 34px;
  margin-top: 24px;
}

@media (max-width: 991px) {
  .error-description {
    max-width: 100%;
  }
}

.button-container {
  align-self: flex-start;
  display: flex;
  margin-top: 24px;
  align-items: flex-start;
  gap: 24px;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1;
  justify-content: flex-start;
}

.primary-button {
  display: flex;
  min-width: 240px;
  flex-direction: column;
  color: var(--Infinite, #3b00b9);
  justify-content: flex-start;
}

.primary-button-text {
  border-radius: 12px;
  border: 2px solid var(--c-white-000, #fff);
  background: var(--c-white-000, #fff);
  box-shadow: 0 0 0 0 #182828;
  gap: 10px;
  padding: 16px 24px;
}

@media (max-width: 991px) {
  .primary-button-text {
    padding: 0 20px;
  }
}

.secondary-button {
  display: flex;
  flex-direction: column;
  color: var(--White, var(--c-white-000, #fff));
  white-space: nowrap;
  justify-content: flex-start;
}

@media (max-width: 991px) {
  .secondary-button {
    white-space: initial;
  }
}

.secondary-button-text {
  border-radius: 12px;
  box-shadow: 0 0 0 rgba(24, 40, 40, 1);
  gap: 10px;
  padding: 16px 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

@media (max-width: 991px) {
  .secondary-button-text {
    white-space: initial;
    padding: 0 20px;
  }
}

.image-column {
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 38%;
  margin-left: 20px;
}

@media (max-width: 991px) {
  .image-column {
    width: 100%;
  }
}

.error-image {
  aspect-ratio: 0.65;
  object-fit: contain;
  object-position: center;
  width: 100%;
  flex-grow: 1;
}

@media (max-width: 991px) {
  .error-image {
    max-width: 100%;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}`;
  return (
    <>
      <main>
        <style>{styles}</style>

        <section class="hero-section">
          <div class="content-wrapper">
            <div class="flex-container">
              <div class="text-column">
                <div class="headline-container">
                  <div class="text-content">
                    <h1 class="error-title">Page Not Found</h1>
                    <p class="error-description">
                      Lost but not forgotten! We can't find the page you
                      requested, but let's explore some interesting corners of
                      the Internet Computer. Try searching or go back to our
                      homepage.
                    </p>
                  </div>
                  <div class="button-container">
                    <a href="/" class="primary-button" role="button">
                      <span class="primary-button-text">
                        Go back to homepage
                      </span>
                    </a>
                    <button class="secondary-button">
                      <span class="secondary-button-text">Search</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="image-column"></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
