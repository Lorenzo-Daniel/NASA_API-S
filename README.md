# NASA Web App

## Project Objective
The primary goal of this project is to **deepen the understanding of API handling** and improve technical skills in working with real-time data. Through this application, the aim is to showcase how to consume, manipulate, and present data from multiple NASA APIs, while enhancing user experience with advanced functionalities such as image zoom, pagination, carousels, and filters.

## Overview
This is a web app built with **Next.js** that interacts with various **NASA APIs**. It includes four main sections: **APOD**, **EPIC**, **PODCAST**, and **MARS ROVERS PHOTOS**. Each section offers a unique user experience, featuring images, audio, and data provided by NASA.

### 1. APOD (Astronomy Picture of the Day)
- **Description**: Allows users to select astronomical images by a specific date or date range.
- **Features**:
  - Each image is accompanied by detailed textual information from the API.
  - The images are:
    - **Zoomable**: Users can zoom in for a closer look.
    - **Fullscreen**: The images can be expanded to fullscreen for better viewing.
    - **Slug navigation**: Clicking on an image navigates to a `[slug]` page with more information about that image.

### 2. EPIC (Earth Polychromatic Imaging Camera)
- **Description**: Allows the selection of Earth images taken by the EPIC camera, grouped by date.
- **Features**:
  - Images are displayed in a **carousel** format.
  - Clicking on an image in the carousel navigates to a detailed `[slug]` page with additional information.
  - The images are also:
    - **Zoomable** for detailed viewing.
    - **Fullscreen** for an enhanced experience.

### 3. PODCAST
- **Description**: Displays a list of NASA-related podcasts.
- **Features**:
  - Initially loads the **first 25 results** with pagination for additional podcasts.
  - Each podcast includes:
    - A playable **audio** directly on the page.
    - A **More** button that navigates to a `[slug]` page, where the podcast transcript and additional details are displayed.
  - On the main podcast page:
    - There is a **select** dropdown to search for podcasts by title within each paginated result.
    - Selecting an episode from the dropdown navigates to the detailed `[slug]` page for that episode.

### 4. MARS ROVERS PHOTOS
- **Description**: Displays photos taken by Mars rovers.
- **Features**:
  - **25 results per page** with pagination.
  - Each image is clickable, navigating to a `[slug]` page with more details.
  - The images are:
    - **Zoomable** for closer inspection.
    - **Fullscreen** for enhanced viewing.

## Technologies Used

### Libraries:
- **Next.js**: The core framework used for building the app, allowing for server-side rendering and optimized performance.
- **animate.css**: For CSS animations.
- **dayjs**: For date handling.
- **react-datepicker**: For selecting dates in forms.
- **react-icons**: For customizable icons in React.
- **react-inner-image-zoom**: To enable image zooming functionality.
- **react-responsive-carousel**: For responsive image carousels.
- **react-responsive-pagination**: To implement pagination throughout the app.
- **react-select**: For custom and accessible dropdowns.
- **react-spinners**: To display loading spinners.
- **sweetalert2**: To show custom alerts and modals.

### Styling:
- **Tailwind CSS**: Used for efficient, responsive design and styling.

---

This project highlights a deep understanding of API interactions, including fetching and managing real-time data, while prioritizing user experience through responsive design and interactive features.

## Deployment

The application is live and can be accessed at the following link:

[Visit the NASA Web App](https://luminous-piroshki-829125.netlify.app/)

This web app is deployed using **Netlify** for easy continuous deployment and integration with GitHub.
