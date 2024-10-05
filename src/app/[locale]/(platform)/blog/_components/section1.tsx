import Link from "next/link";
function Firstsection() {
  return (
    <Link href={"filband/?blogtype=1&blogid=26"}>
      <div className="ml-5 mr-5 mt-5 flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 lg:flex-row">
        <img
          src="/assets/blog/alimastanfinal.jpg"
          alt="State of Medium 2024"
          className="w-[605px] rounded-md"
        />

        <div className="mr-2 lg:mr-16">
          <h3>جنگل الیمستان</h3>
          <p>
            الیمستان یکی از زیباترین مناظر را در فصول بهار و تابستان به گردشگران
            و دوستداران طبیعت نوید می‌دهد. این منطقه را مه غلیظ و جنگل‌های سرسبز
            و انبوه در برگرفته است و به طلای سبز ایران شهرت دارد. جنگل‌های
            الیمستان، محل رویش گیاه «الیما» است که در اردیبهشت ماه رشد می‌کند و
            آن‌طور که به‌نظر می‌آید، نام جنگل الیمستان نیز از آن گرفته شده است.
          </p>
          <div className="mt-10 flex flex-row gap-3"></div>
        </div>
      </div>
    </Link>
  );
}

export default Firstsection;
