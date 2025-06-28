# GaalxiMart

GaalxiMart is an online wholesale web platform where users can browse a wide range of products across various categories.

## Live Link
[GaalxiMart](https://galaxi-mart.netlify.app)

---
## Server side repository
[Server](https://github.com/Mysterio-O/Galaximart-server)

## Key Features

### Navbar
- **Responsive Design**: Fully responsive across all devices.
- **Navigation Options**:
  - **Home Button**: Redirects to the homepage.
  - **Categories Button**: Smoothly scrolls to the categories section.
  - **All Products**:
    - Displays products from all categories.
    - Sort products by minimum buying quantity.
    - Toggle between **Table View** and **Card View** using a button at the top right.
    - **Scroll-to-Top**: Fixed arrow button at the bottom right.
    - **Update Button**: Each card or table row has an update button that navigates to a product update page. Update page includes multiple form inputs with current product data. User can edit or add any kind of data from there by inserting in the field and clicking on the update button.
  - **Add Products**: Allows users to add products to the site.
  - **My Products**:
    - Displays products added by the logged-in user.
    - Users can delete their products from this page.
  - **Cart Icon**:
    - Shows ordered products.
    - Includes a cancel button to cancel orders.
  - **User Photo**:
    - Hovering displays a tooltip with a logout button.
    - Clicking logout shows a confirmation modal.
  - **Sign-In Button**: Replaces user photo for non-logged-in users.
  - **Private Routes**:
    - All Products, Add Products, My Products and Product Details are private.
    - Non-logged-in users are redirected to the sign-in page and then to their desired route after signing in.

### Banner Section
- **Animated Video**: Features random mart-related content for decoration.

### Categories Section
- **Animated Buttons**: Card-shaped buttons for each category.
- **Category Page**: Clicking a button redirects to a page with products from the selected category.

### Product Cards
- **Minimal Info**: Displays basic product details with a **Details** button.
- **Details Page**:
  - Contains extensive product information.
  - Includes **Wishlist** and **Add to Cart** buttons (decorative).
  - **Buy Now** button opens a modal with user details, address, and payment methods.
  - **Sweet Alert**: Confirms user action after purchase.
  - **Out-of-Stock Handling**: Add to Cart and Buy Now buttons are hidden for out-of-stock products.

### Galaxy Parallax Component
- A unique, visually distinct component created with significant effort.
- Explore your own by entering parallax!

### 3D Object
- **Imported From**: React Bits
- **Technology**: Built using GSAP and Three.js.
- **Interaction**: Animated based on scroll progress.

### Best Selling Products
- **Heading**: Features a decrypted entering style.
- **Infinite Loop**: Displays a box of best-selling products.

### Footer
- **Glowing Logo**: Central visual element.
- **Navigation**:
  - Categories: Scrolls to the categories section.
  - About Us and Contact Us sections.
- **Social Icons**: Redirect to social media accounts in a new tab.

## AI Journey
- **Design Ideas**: Used Grok to generate banner photo ideas, later switched to video ideas.
- **Video Creation**: Took Grok's video prompt to Gemini Pro for generation, then optimized with HandBrake.
- **Impact**: AI tools like Grok, Gemini, and ChatGPT significantly saved time with design ideas and solving errors.


## Dependencies

User many technologies like React, Vite, Motion, Firebase, three js, swiper js, gsap, axios, react bits, UIVerse, ZenUi, DaisyUi, TailwindCss, dotenv, react-icons, react-intersection-observer, react-router, react-simple-star-rating, react-tooltip and other
Install the required dependencies using the following commands:

```bash
npm install @react-three/drei@^10.3.0
```
```bash
npm install @react-three/fiber@^9.1.2
```
```bash
npm install @tailwindcss/vite@
```
```bash
npm install axios@
```
```bash
npm install dotenv
```
```bash
npm install firebase@
```
```bash
npm install gsap
```
```bash
npm install meshline
```
```bash
npm install motion/react
```
```bash
npm install react/vite
```
```bash
npm install react-icons
```
```bash
npm install react-intersection-observer
```
```bash
npm install react-router
```
```bash
npm install react-simple-star-rating
```
```bash
npm install react-tooltip
```
```bash
npm install styled-components
```
```bash
npm install sweetalert2
```
```bash
npm install swiper
```
```bash
npm install three
```
```bash
npm i -D daisyui@latest
```