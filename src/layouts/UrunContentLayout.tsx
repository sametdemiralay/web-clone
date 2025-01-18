type Props = {
  children: React.ReactNode;
};

export default function UrunContentLayout(props: Props) {
  return (
    <div className="border-[40px] border-pink-800" >
      ürün detayları
      {props.children}</div>
  );
}
