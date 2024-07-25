
import chai from '../assets/chai.png';
import Header from './Header';

function Page(Component, color, texColor = 'text-white') {
  return function DefaultPage(props) {
    return (
      <>
        <div className={`min-h-screen w-full items-center ${color}`}>
          <Header />
          <h1 className={`font-sans w-full flex justify-center items-center py-6 ${texColor} font-bold text-5xl lg:text-6xl`}>
            Chai Aur Code
          </h1>
          <div className='w-full flex justify-center items-center py-6'>
            <Component {...props} />
          </div>
        </div>
        <div className='w-20 fixed z-0 bottom-10 right-10'>
          <a href="https://courses.chaicode.com" target='blank'><img src={chai} alt="Chai" /></a>
          
        </div>
      </>
    );
  }
}

export default Page;
