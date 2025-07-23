# Sabe Casa — Home Decor Application
---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [UI Components](#ui-components)
- [Setup Instructions](#setup-instructions)
- [Design Philosophy](#design-philosophy)
- [Accessibility](#accessibility)
- [Future Enhancements](#future-enhancements)

##  Introduction

**Sabe Casa** is a full-stack web application that blends interior design inspiration with real shopping functionality.  
Built with React and Spring Boot, it allows users to browse curated room designs, explore a furniture catalog, save their favorite products, and manage personal wishlists.
Whether you're seeking design ideas or ready to furnish your space, Sabe Casa offers a seamless and responsive experience across devices.


## Features

-  **My Saved Edit**: Add favorite designs to your personal collection and manage them from the profile dropdown.
-  **Design Gallery**: Scroll through a card-based layout of themed room inspirations.
-  **Editor's Picks**: A selection of highlighted styles curated for visual impact.
-  **Filters**: Quickly filter inspirations by room type: `Living Room`, `Bedroom`, `Kitchen`.
-  **Seasonal Carousel**: Explore featured decor based on the season (e.g., *Summer Vibes*).
-  **Store Catalog**: Browse real home decor products with images, titles, and prices.
-  **Store Favorites**: Wishlist store products you love and view them in a dedicated section.
-  **Buy Flow with Stripe**:  Store products can be securely purchased using integrated Stripe checkout.
-  **User Authentication**: Login system to personalize Store Favorites and future features.
-  **Responsive Design**: Optimized layout for desktop and mobile devices.

##  Technologies Used

| Technology  | Purpose                              | Notes                                      |
|-------------|--------------------------------------|--------------------------------------------|
| React 18    | UI library                           | Functional components + Hooks              |
| Vite        | Build tool                           | Fast HMR, lightweight builds               |
| JavaScript  | Programming language                 | Modern syntax and modules                  |
| CSS3        | Styling                              | Flexbox/Grid, hover effects                |
| Spring Boot | Backend framework                    | RESTful API services                       |
| Java 17     | Backend programming language         | Used with Spring Boot                      |
| MongoDB     | NoSQL database                       | Stores products and wishlists              |
| Gradle      | Backend build & dependency tool      | Used for managing Spring Boot project      |
| CORS Config | Cross-Origin Resource Sharing setup  | Enables secure frontend-backend connection |
| Stripe      | Payment gateway integration          | Secure payment processing for store        |



##  UI Components

| Component        | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `Card`           | Displays individual decor inspiration with title, image, and heart icon.    |
| `Carousel`       | A horizontal slider showcasing seasonal designs.                            |
| `SavedEdit`      | Lists all designs marked as favorite with a remove option.                  |
| `StoreCard`      | Displays a store product with image, title, price, and wishlist icon.       |
| `StoreFavorites` | Shows wishlisted store items for the logged-in user.                        |
| `LoginForm`      | Handles user login and sets the authenticated session.                      |
| `RegisterForm`   | Collects user credentials to create a new account.                          |
| `Header`         | Top navigation bar with links and profile dropdown.                         |
| `FilterButtons`  | Buttons to filter decor ideas by room type.                                 |
| `StripeCheckout` | Component that integrates Stripe payment flow for product checkout.         |


## Setup Instructions

### Prerequisites

#### Frontend
- Node.js (v16 or higher)
- npm (v8 or higher)
#### Backend
-Java 17+
-Gradle
-MongoDB 

### Installation

```bash
git clone https://github.com/shreya-gudsurkar/home-decor.git
cd home-decor
npm install
```
```bash
cd ../homedecor-backend
./gradlew bootRun
```

## Design Philosophy

* **User-Centric Design**: Easy navigation and clear information presentation for an intuitive user experience.
* **Minimalistic Aesthetic**: Simple, clean design focusing on visuals that matter most — the decor items.
* **Performance Optimization**: Fast page load times, optimized images, and smooth transitions.
* **Mobile-First**: A responsive, mobile-first design ensuring a seamless experience on all screen sizes.
* **Component Reusability**: Modular components that simplify code maintenance and UI consistency.

## Accessibility

This project prioritizes accessibility by implementing WCAG 2.1 standards, including:

* **Semantic HTML Structure**: Provides better navigation and screen reader compatibility.
* **Keyboard Navigation**: Full support for navigating UI elements via keyboard.
* **ARIA Attributes**: Assistive labels for interactive components.
* **High Color Contrast**: Ensures visibility and clarity for users with low vision.
* **Alt Text**: Included for all images to improve screen reader interpretation.
* **Focus Management**: Clear focus styles for active elements.

## Future Enhancements

* **My Orders / Order History**: Track past purchases, view receipts, and manage order status.
* **AI-Powered Recommendations**: Suggest decor styles based on saved designs or user interactions.
* **Inspiration-to-Store Linking**: Enable direct navigation from mood boards to purchasable products.
* **3D Room Viewer**: Interactive space planning tool to visualize furniture layout and design


