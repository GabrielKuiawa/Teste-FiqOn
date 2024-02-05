const axios = require('axios');

const auth = async () => {
  const session_url = "https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/autenticacao/57441afd5a59ccd4c62816683fcc8d665c42bb7b12857fc64a6cace4ababdc67f78c70b044";
  const response = await axios.post(session_url, {}, {
      auth: {
        username: "teste_fiqon",
        password: "senha@115#"
      }
  });
  
  return response.data.api_token;
}

const pillarsFiqOn = async () => {
  const session_url = "https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/listar_pilares/76b07f1dbf18eabde7b8e3611ab078daa0f34b094cc9856d20d6d0b15fb3b7a99f697e451d";
  
  let api_token = await auth();
  let page = 0;
  let pillars = "";


  while(page < 5) {
    let url_page = session_url + `?page=${page}&api_token=${api_token}`
    const response = await axios.get(url_page);
    page = response.data.next_page;
    pillars += response.data.data;
    console.log(`${page}º ${response.data.data}`);
  }  


  return pillars;
}

const sendPillars = async () => {
  const session_url = "https://instance.fique.online/webhook/merge/88d8701e-a1d6-4fee-b15b-53e90dc1d126/envia_resposta/7b56940678e89802e02e1981a8657206d639f657d4c58efb8d8fb74814799d1c001ec121c6?api_token=yObzWFzqFmXe7tL2hA2NZvUsUb6hoQz79FrDueFq";
  let base64 = Buffer.from(await pillarsFiqOn()).toString('base64');
  const body = {"answer" : base64 };
  const response = await axios.post(session_url,body);
  
  
  console.log(response.data);
}

sendPillars();