module.exports = (
  { HeaderMsg = "كود التفعيل" },
  { Img = "https://i.ibb.co/hyTZt8L/ActMail.png" },
  { href, textHref },
  code,
  { FooterMsg = "لتفعيل بريدك الإلكتروني" }
) => {
  return `
        <div style="background-color: #6a6a6a; color: #fff; text-align: center; font-size: 28px; border-radius: 10px; padding: 8px 0; margin-bottom: 10px">
          <b>&_. ${HeaderMsg} ._&</b>
        </div>
      
        <div style="text-align: center;">
          <img src=${Img} alt='arrow active email' width='350px' height='200px'/>
        </div>
        
        <div style="text-align: center; margin-bottom: 10px">
          <p> ☺ إذهب إلي <b>الرابط</b> ثم الصق <b>الكود</b> هناك ☺ </p>
          <p style='font-size: 10px; font-weight= bold'> ملحوظه": إضغط علي الرابط مباشرةً لا تنسخه </p>
          <a href=${href} target='_blank' style='text-decoration: none;'>${textHref}</a>
        </div>
      
        <div style="text-align: center; font-size: 20px; font-weight: bold; letter-spacing: 2px; border: 1px solid #6a6a6a; border-radius: 10px 5px; margin-bottom: 10px;">
          ${code}
        </div>
      
        <div style="background-color: #6a6a6a; color: #fff; text-align: center; font-size: 26px; border-radius: 10px; padding: 8px 0;">
          <b>@ - %.  ${FooterMsg} علي (أنا موجود) .% - @</b>
        </div>
        `;
};
