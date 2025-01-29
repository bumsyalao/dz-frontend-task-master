# SOLUTION

## Project Overview
This project is a feature-rich e-commerce application built using **Next.js**, **React**, **TypeScript**, and **TailwindCSS**. It enables users to browse products, view product details, add items to a shopping cart, proceed to checkout, and view order history. The implementation follows modern frontend development practices, including state management with the **React Context API** and **localStorage** for cart persistence.

## Thought Process
The goal was to create an efficient and scalable e-commerce platform while following best practices in component design, state management, and API integration. The following factors were considered:
- **Modular and reusable components**: Ensuring maintainability and reusability.
- **Optimized state management**: Using the Context API for cart handling and ensuring localStorage synchronization.
- **API Integration**: Efficiently fetching and managing product, category, and order data.
- **User Experience**: Smooth interactions with features like cart updates, checkout validation, and confirmation messages.
- **Performance Enhancements**: Implementing lazy loading, caching strategies, and handling loading states effectively.

## Architecture Design Decisions
### Folder Structure
```
/app
  ├── (app)/context/CartContext.tsx
  ├── (app)/helpers/
  ├── (app)/products/page.tsx
  ├── (app)/products/[productId]/page.tsx
  ├── (app)/categories/page.tsx
  ├── (app)/cart/page.tsx
  ├── (app)/checkout/page.tsx
  ├── (app)/orders/page.tsx
  ├── components/
  ├── hooks/useProducts.ts
  ├── types/
  ├── public/
  ├── lib/
```
This structure follows Next.js conventions, with each route representing a feature of the application. The **CartContext** manages global cart state, while **hooks** handle fetching logic.

### State Management
- **React Context API** was chosen for managing cart state since it provides a simple and efficient way to share state across components without prop drilling.
- **localStorage** was used to persist cart data, ensuring that users don’t lose their selections when refreshing the page.

### API Handling
- Fetching is handled via custom React hooks (`useProducts.ts`), which encapsulate logic for retrieving product and category data.
- **Error handling** was implemented to carefully manage API failures.
- **Debouncing** is used to prevent redundant API calls.

### Performance Optimizations
- Implemented **Next/Image** for images to improve page load speed.
- Used **server-side rendering (SSR)** for product pages to enhance SEO and initial page load performance.
- Implemented **loading states** for a smoother UX.

## Assumptions and Trade-offs
- **Trade-off: Using localStorage vs. Backend for Cart Data**
  - Storing the cart in localStorage means users’ carts are only available on the same device.
  - A backend solution would allow for cross-device syncing but would require authentication.

- **Trade-off: Context API vs. Redux**
  - Context API was chosen over Redux due to the relatively small state requirements and task requirement.
  - If the application scaled with more complex state logic, Redux or Zustand might be better.

- **Other Tradeoffs due to time constraint**
    - Creating animations and interactive popups for a much better user experience
    - Utilising more components from `shadcn/ui`
    - Writing unit test for hooks logics and conditionally rendered components.
    - Adding infinite scroll and testing with many products

## Libraries and Tools Used
| Library/Tool | Purpose |
|-------------|---------|
| **Next.js** | Framework for React with routing and API handling |
| **React** | UI Component-based architecture |
| **TypeScript** | Type safety and better developer experience |
| **TailwindCSS** | Styling and responsiveness |
| **shadcn/ui** | UI components for buttons, inputs, and modals |
| **Lodash** | Utility functions, including debounce for API requests |

## How to Run the Application
### Prerequisites:
- Node.js (LTS version recommended)
- Yarn or npm installed

### Steps:
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <repo-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open the application in the browser:
   ```sh
   http://localhost:3000
   ```


## Conclusion
This solution successfully implements all of the required features while focusing on performance, maintainability, and best practices. The use of Context API for cart state, optimized API fetching, and responsive UI ensure a seamless shopping experience. Future improvements could include imporved user experience, authentication for persistent carts and enhanced order status tracking functionalities.

