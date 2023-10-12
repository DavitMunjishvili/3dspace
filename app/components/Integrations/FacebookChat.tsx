import { useEffect, useRef } from "react";

export default function FacebookChat() {
  const MessengerRef = useRef<HTMLDivElement>(null);
  const pageId = '110859698615468'
  useEffect(() => {
    MessengerRef.current?.setAttribute('page_id', pageId);
    MessengerRef.current?.setAttribute('attribution', 'biz_inbox');

    // @ts-ignore
    window.fbAsyncInit = function() {
      // @ts-ignore
      FB.init({
        appId: pageId,
        xfbml: true,
        version: 'v18.0'
      });
    };
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      // @ts-ignore
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);
  return (
    <>
      <div id="fb-root"></div>
      <div ref={MessengerRef} id="fb-customer-chat" className="fb-customerchat"></div>
    </>
  );
};
