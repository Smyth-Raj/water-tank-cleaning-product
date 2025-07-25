const subscribers = {};

// Subscribe to a topic
function subscribe(topic, handler) {
  if (!subscribers[topic]) {
    subscribers[topic] = [];
  }
  subscribers[topic].push(handler);
  console.log(`Subscribed to topic: ${topic}`);
}

// Publish an event
function publishEvent(topic, payload) {
  console.log(`[Kafka] Publishing to ${topic}:`, payload);
  if (subscribers[topic]) {
    for (const handler of subscribers[topic]) {
      setTimeout(() => handler(payload), 0); // async delivery
    }
  }
}

module.exports = {
  subscribe,
  publishEvent,
};
