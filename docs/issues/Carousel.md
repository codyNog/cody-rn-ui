# Carousel Component Requirements (Material Design 3)

## 1. Overview

- This document outlines the requirements for a `Carousel` component based on Material Design 3 (MD3) guidelines for the React Native UI library.
- The component allows users to browse through a collection of items horizontally (or vertically for Full-screen).
- This component is new in Material 3.

## 2. Layouts & Alignment

### Layout Types

MD3 defines several carousel layouts:

- **Multi-browse:**
    - *Best for:* Browsing many visual items at once (e.g., photos, event feeds), dynamic designs.
    - *Behavior:* Displays multiple items of potentially varying sizes. Recommended: **Snap-scrolling**. Avoid if items need lots of text/complex imagery. More items visible on larger screens.
- **Uncontained:**
    - *Best for:* Highly-customized or text-heavy carousels, stacking images/text, traditional behavior.
    - *Behavior:* Items are a single size, flow past screen edge. Supports **Default scrolling** or **Snap-scrolling**. More flexibility for surrounding text/UI.
- **Hero:**
    - *Best for:* Spotlighting large visual items (e.g., movies, featured apps).
    - *Behavior:* Highlights one large item, previews next. Recommended: **Snap-scrolling** (one-at-a-time). More large items visible on larger screens.
- **Center-aligned Hero:**
    - *Best for:* Centered, large visual items.
    - *Behavior:* Variation of Hero, adds leading preview item to center the main item. Recommended: **Snap-scrolling**.
- **Full-screen:**
    - *Best for:* Immersive experiences (e.g., vertical video/image feeds, headlines).
    - *Behavior:* Each item fills the screen. Best with portrait content, scrolls vertically. Only for portrait on compact/medium windows. Must use **Snap-scrolling**.

### Alignment

- **Start-aligned:** Items align to the starting edge.
- **Center-aligned:** Primary item aligns to the center (common for Hero).

## 3. Anatomy

- **Container:** Holds items. Visible item count varies by layout/window size.
- **Carousel Items:** Hold content (images, video, text, etc.). Dynamically change width based on size/position (except Uncontained).
    - **Dynamic Sizes:** Transition between `large`, `medium`, `small` widths (except Uncontained).
        - *Large:* Adjustable max width, affects others. Must ensure legibility.
        - *Medium:* Adjusts dynamically.
        - *Small:* Width range ~40–56dp.
    - *Hero Specifics:* Uses `large` and `small` sizes.
- **Item Text (Optional):**
    - Primarily visual; keep text brief.
    - Consider Uncontained/Cards for heavy text.
    - Adapt text to item size (full on large, brief/hidden on small). Avoid >2 lines on compact unless background is simple.

## 4. Core Functionality

- **Scrolling/Swiping:** Horizontal (most layouts) or Vertical (Full-screen).
- **Content Flexibility:** Supports various content types, varying item dimensions.
- **Indicator:** MD3-compliant visual indicator (e.g., dots) for item count and current position.

## 5. Motion & Interaction

- **Smooth Swipe Gesture:** Responsive swiping.
- **Scrolling Types:**
    - *Default Scrolling:* Items stop anywhere. Only for **Uncontained**.
    - *Snap-scrolling:* Items snap to layout grid on release. Recommended for **Multi-browse**, **Hero**, **Full-screen**. Full-screen must snap precisely to edges.
- **Parallax Effect:** Item visuals move at different speed than content during scroll. (Disable for Reduced Motion).
- **Dynamic Item Size/Shape:** Items change size/shape during scroll (except Uncontained). (Disable for Reduced Motion).
- **Touch Interaction:** Tapping an item provides visual feedback (e.g., shape change, ripple).
- **Cursor Interaction (Web/Desktop):** Hover state indicates interactivity. Click triggers ripple feedback.

## 6. Responsive Layout

- **Dynamic Adaptation:** Items adapt to window size.
- **Item Visibility:** More items visible and scale on larger screens.
    - *Compact Windows (Multi-browse):* Show up to 3 items comfortably with text. More if imagery is simple/recognizable.
- **Legibility:** Ensure content is clear at all sizes. Avoid making items too small.

## 7. Optional Features

- **Navigation Controls:** Optional "previous"/"next" buttons (place above/below, not inside/beside).
- **Looping:** Option for infinite looping.
- **Autoplay:** Option for automatic transitions (pause on interaction).
- **Indicator Interaction:** Tapping indicator dot could navigate.

## 8. Accessibility

### General Requirements

- Users with assistive technology must be able to:
    - Navigate to the carousel container.
    - Navigate between items.
    - Activate an item.
    - Skip over the carousel.

### Focus Management

- **Initial Focus:** On navigating to the carousel (e.g., via Tab), focus should land on the **first interactive carousel item**, not the container.
- **Item Navigation:** Use `Tab` or `Arrow Keys` (Left/Right for horizontal, Up/Down for vertical) to move between items within the carousel.
- **Exiting Carousel:** Use `Arrow Keys` (Up/Down for horizontal, Left/Right for vertical - adjust based on page flow) to move focus out of the carousel to the next/previous element on the page (like the "Show all" button).

### Keyboard Navigation

| Keys             | Actions                                     |
| :--------------- | :------------------------------------------ |
| `Tab` / `Arrows` | Moves focus to the previous/next item       |
| `Space` / `Enter`| Activates the focused item                  |
| `Arrows` (Ortho) | Moves focus out of the carousel (Up/Down)   |

### Labeling & Roles

- **Container Role:** The carousel container should have an appropriate role (e.g., `region`, `group`, or specific carousel role if available).
- **Container Label:** Provide an accessible name for the carousel container (e.g., via `aria-label` or `aria-labelledby`).
- **Item Labels:** Each item's label should indicate its content and its position within the carousel (e.g., "Item 3 of 10: [Item Content Description]").

### Alternative Scrolling ("Show all")

- **Requirement:** On vertically scrolling pages, provide an accessible way to view all items without horizontal scrolling (not required for Full-screen).
- **Implementation:**
    - **Without Header:** Add a "Show all" `Button` below the carousel (4dp padding recommended). This button should navigate to a dedicated page/view displaying all items vertically.
    - **With Header:** Use an `IconButton` (arrow icon, 48dp target size recommended) placed next to the header (aligned with leading edge). This also navigates to the vertical list. The header should be present on the "all items" page too.
- **Placement:** Do **not** place navigation controls (like arrows) *inside* or directly *beside* the carousel container if they obstruct content or reduce container width. Place controls above or below. Avoid floating controls over items.
- **Customization:** Stick to recommended solutions ("Show all" button/header arrow) when possible. If alternatives are needed, ensure they are discoverable and close to the carousel.

### Reduced Motion

- **Behavior:** When reduced motion settings are enabled:
    - Disable the parallax effect.
    - Disable dynamic item resizing/shape changing (all items become the same size).
    - Ensure items scroll fully to the edges to avoid clipping.
- **Hero Layout (Reduced Motion):** The small preview item is only partially shown.

## 9. Material Design 3 Specifics & Differences from M2

- **New Component:** Carousel is new in M3.
- **Shape/Size:** Items dynamically change size/shape (disabled in Reduced Motion).
- **Motion:** Parallax effect, snap-scrolling (disabled/modified in Reduced Motion).
- **Interaction:** Defined scrolling behaviors, touch/cursor feedback.
