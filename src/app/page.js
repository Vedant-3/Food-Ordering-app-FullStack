import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeader';

export default function Home() {
  return (
    <section >
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id='about'>
        <SectionHeaders subHeader={'Our story'} mainHeader={'About Us'} />
        <div className="max-w-md mx-auto mt-4 flex flex-col gap-4 text-gray-500">
          <p>jfbvjb fvifvfvirvr vhcec ehcwhhcuw cew8 yewcew8 8c8ce7e7c ec8cy8y w88yw8qy8w y8 yc8wycw8 yc8yc82yc</p>
          <p>jfbvjb fvifvfvirvr vhcec ehcwhhcuw cew8 yewcew8 8c8ce7e7c ec8cy8y w88yw8qy8w y8 yc8wycw8 yc8yc82yc</p>
        </div>
      </section>

      <section className="text-center my-8" id='contact'>
        <SectionHeaders subHeader={'Don\'t Hesitate'} mainHeader={'Contact Us'} />
        <div className="mt-8">
          <a className='text-4xl text-gray-500' href="tel:+461231231234">+46 123 123 1234</a>
        </div>
      </section>

    </section>
  );
}
