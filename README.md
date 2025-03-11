# Reusable Animated Sheet Component

A resuable and animated sheet component for React applications built with Framer Motion and Material UI.

## Overview

This component provides an elegant side panel animation with configurable properties, perfect for forms, details panels, and supplementary content in modern web applications.

## Features

- Smooth animation with customizable spring physics
- Backdrop overlay with opacity transitions
- Focus management for accessible form interactions
- Responsive design that works across device sizes
- TypeScript support with full type definitions

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/akshat-xebia/animated-form-component.git
cd animated-sheet-component
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

## Implementation

The component consists of three main parts:

1. **AnimatedSheet**: A slide-in panel with animation controls
2. **UsersTable**: Example implementation showing data in tabular format
3. **AddUser**: Form component demonstrating proper form handling within the sheet

## Props

| Prop                | Type      | Description                                          |
| ------------------- | --------- | ---------------------------------------------------- |
| isOpen              | boolean   | Controls the visibility of the sheet                 |
| onClose             | function  | Callback function triggered when the sheet is closed |
| children            | ReactNode | Content to be rendered inside the sheet              |
| onAnimationComplete | function  | Optional callback when animation completes           |

## Example

```jsx
import AnimatedSheet from "./components/AnimatedSheet";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Sheet</button>

      <AnimatedSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Sheet Content</h2>
        <p>Your content goes here</p>
      </AnimatedSheet>
    </div>
  );
}
```

## Best Practices

- Form states are automatically reset when the sheet closes
- First input field receives focus when the sheet opens
- Animation parameters are optimized for smooth transitions

## Author

Akshat Dubey
