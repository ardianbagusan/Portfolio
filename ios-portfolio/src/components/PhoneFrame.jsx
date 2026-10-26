// The phone box. On a wide screen it sits centred on black; on a phone it fills the screen.
export default function PhoneFrame({ children }) {
  return (
    <div className="stage">
      <div className="phone">
        <div className="island" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
