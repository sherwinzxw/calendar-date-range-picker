export default function listenForOutsideClicks(
  listening: any,
  setListening: any,
  menuRef: any,
  setIsOpen: any
) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`, `mousedown`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const cur = menuRef.current as any;
        const node = evt.target as any;
        if (cur !== null) {
          if (cur.contains(node)) return;
          setIsOpen(false);
        } else {
          return;
        }
      });
    });
  };
}
