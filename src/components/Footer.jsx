import React from 'react';
import logoMark from '@/assets/images/logoSaleNoti.png';

const Footer = () => {
  return (
    <footer
      id="footer"
      className="w-full px-4 flex items-center bg-white shadow-zenius overflow-x-hidden font-bold justify-center"
    >
      <div className="flex w-10/12">
        <div className="lg:w-4/12 sm:w-1/2 w-full p-5 leading-7">
          <p>Má»™t sáº£n pháº©m cá»§a ASV Software</p>
          <div className="text-center w-1/2 p-0">
            <img
              src={logoMark}
              alt="ÄÃ£ thÃ´ng bÃ¡o Bá»™ CÃ´ng ThÆ°Æ¡ng"
              className="max-w-full"
            />
          </div>
          <ul className="list-disc">
            <li>
              <a
                href="https://kingcontent.pro/chinh-sach-bao-mat"
                target="_blank"
                className="underline"
              >
                ChÃ­nh sÃ¡ch báº£o máº­t
              </a>
            </li>
            <li>
              <a
                href="https://kingcontent.pro/huong-dan-su-dung"
                target="_blank"
                className="underline"
              >
                HÆ°á»›ng dáº«n sá»­ dá»¥ng
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:w-4/12 sm:w-1/2 w-full p-5 leading-7">
          <p>
            THá»œI GIAN LÃ€M VIá»†C <br /> Tá»« 7h30 Ä‘áº¿n 17h30 cÃ¡c ngÃ y trong tuáº§n{' '}
            <br />
            Hotline: 0704.499.995 (Mr. PhÆ°á»›c)
          </p>
          <a href="mailto:kingcontent.pro@gmail.com" target="_blank">
            kingcontent.pro@gmail.com
          </a>
        </div>
        <div className="lg:w-4/12 sm:w-1/2 w-full p-5 leading-7">
          <p>
            Kingcontent.pro chá»‰ lÃ  cÃ´ng cá»¥ giÃºp báº¡n tá»•ng há»£p cÃ¡c nguá»“n content
            vÃ o má»™t trang web duy nháº¥t. Viá»‡c sá»­ dá»¥ng láº¡i content nÃ y vÃ o báº¥t kÃ¬
            má»¥c Ä‘Ã­ch nÃ o khÃ¡c do ngÆ°á»i dÃ¹ng tá»± chá»‹u trÃ¡ch nhiá»‡m trÆ°á»›c tÃ¡c giáº£ vÃ 
            phÃ¡p luáº­t quy Ä‘á»‹nh.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

