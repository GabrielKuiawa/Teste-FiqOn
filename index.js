const axios = require('axios');

let url_authentication = "https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/autenticacao/57441afd5a59ccd4c62816683fcc8d665c42bb7b12857fc64a6cace4ababdc67f78c70b044";
let url_list_pilares = "https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/listar_pilares/76b07f1dbf18eabde7b8e3611ab078daa0f34b094cc9856d20d6d0b15fb3b7a99f697e451d";
let url_send_response = "https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/envia_resposta/7b56940678e89802e02e1981a8657206d639f657d4c58efb8d8fb74814799d1c001ec121c6";

const auth = async () => {
  const session_url = url_authentication;
  const response = await axios.post(session_url, {}, {
      auth: {
        username: "teste_fiqon",
        password: "senha@115#"
      }
  });
  
  return response.data.api_token;
}

const pillarsFiqOn = async () => {
  const session_url = url_list_pilares;
  
  let api_token = await auth();
  let page = 0;
  let more_items = true;
  let pillars = "";

  while(more_items) {
    let url_page = session_url + `?page=${page}&api_token=${api_token}`
    const response = await axios.get(url_page);

    page = response.data.next_page;
    more_items = (response.data.more_items == "true");
    pillars += response.data.data;

    console.log(`${page}º ${response.data.data}`);
  }  

  return {data : pillars, token : api_token};
}

const sendPillars = async () => {
  pillars = await pillarsFiqOn();
  const session_url = url_send_response + `?api_token=${pillars.token}`;
  let base64 = Buffer.from(pillars.data).toString('base64');
  const body = {"answer" : base64 };
  const response = await axios.post(session_url,body);
  
  console.log(response.data);
}

sendPillars();