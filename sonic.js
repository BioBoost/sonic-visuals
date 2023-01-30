// An mqtt variable will be initialized globally
// console.log(mqtt)

const url = 'ws://mqtt.devbit.be:80';

const options = {
  clean: true,
  connectTimeout: 4000,
  // clientId: 'emqx_test',
};

const client  = mqtt.connect(url, options)
client.on('connect', function () {
  console.log('Connected')
  // client.subscribe('sonic/modules/measurements')
  client.subscribe('test/measurements')
});

deviceMapping = {
  'esp32-sonic-f10f7c': 'note1',
  'esp32-sonic-e2c6c4': 'note2',
  'esp32-sonic-e29abc': 'note3',
  'esp32-sonic-e36270': 'note4',
  'esp32-sonic-e37fa4': 'bpm',
}

// Receive messages
client.on('message', function (topic, message) {    // message is Buffer
  data = JSON.parse(message.toString())

  const percentage = `${data['distance']}%`;
  document.getElementById(deviceMapping[data['id']]).style.height = percentage;
  document.getElementById(`${deviceMapping[data['id']]}_text`).innerText = percentage;
});
