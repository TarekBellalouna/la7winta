class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
        console.log(message);
        const lowercase = message.toLowerCase();
    
        if (lowercase.includes("hello")) {
          this.actionProvider.greet();
        } 
        else  if (lowercase.includes("where can i find the cherity events !")) {
            this.actionProvider.greet1();
          }
    }
  }
  export default MessageParser; 