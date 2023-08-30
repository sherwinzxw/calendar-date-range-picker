// NSW Design System use a custom HTML Element Attribute 'focusable'
// This adds custom HTML Attribute supports by specifically naming out the attribute name in the interface list
declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      focusable?: string;
    }
  }
  
  export default "react";
  