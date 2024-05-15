const WebSocket = require("ws");
let operationsQueue = [];

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

function readLine() {
    return inputString[currentLine++];
}


let x = readLine();
console.log(x);

// let content = '';
// let documentVersion = 0;
// let name = '';
// let owner_id = 0;
// let doc_id = 0;

// let currPos = 0;


// let ws;



// // Function to send message to server
// function send(otMessage) {
//     while(ws.readyState !== 1){

//     }
// 	ws.send(JSON.stringify(otMessage));
// }

// function handleKeyPress() {
//             let docContent = '';
// 			let kCd = readLine();

// 			let deleted = '';
// 			let val = docContent;
// 			let action;
// 			let chr = '';
// 			let pos = currPos;
// 			/* Ignore these keys - 
// 			Up: 38,Down: 40,Right: 39,Left: 37,Esc: 27
// 			Ctrl: 17,Alt: 18, Shift: 16*/
// 			var ignoreKeys = [ 38, 40, 39, 37, 27, 17, 18, 16, 46, 13 ];
// 			if (kCd == 'd') { // Backspace
// 				if (currPos == 0)
// 					deleted = '';
// 				else
// 					deleted = val.substring(currPos - 1, 1);
// 				action = 'DELETE';
// 				chr = deleted;
// 				pos = currPos - 1;
// 			} else if (ignoreKeys.includes(kCd)) {
// 				console.log("Ignored - " + chr);
// 				action = 'ignore';
// 			} else {
// 				action = 'INSERT';
// 				chr = kCd;
// 			}

// 			queueOrSend(action, chr, pos, documentVersion);

// 		}

// function queueOrSend(action, chr, pos, versionBeforeThisOp){ 
// 	if (action && action !== 'ignore' && pos >= 0) {
// 		var timestamp = Date.now();
// 		var otMessage = {
// 			"Action" : action,
// 			"character" : chr,
// 			"pos" : pos,
// 			"versionBeforeUpdate" : versionBeforeThisOp,
// 			"timestamp" : timestamp,
// 			"docId" : doc_id
// 		};
// 		// If there are no operations in queue then send directly, else add to queue.
// 		if (operationsQueue.length === 0) {
// 			send(otMessage);
// 		}
// 		operationsQueue.push(otMessage);
// 	}
// }


//         function processReceivedOperation(operationRec) {
// 			if (operationRec["isAck"]) {
// 				// If its just acknowledgement of earlier operation from this session, then update version.
// 				updateVersion(operationRec["versionAfterThisOp"]);

// 				// Remove acknowledged operation from operationsQueue
// 				for (let i = operationsQueue.length - 1; i >= 0; i--) {
// 					if (operationsQueue[i].timestamp === operationRec.timestamp) {
// 						console.log("Ack received so removing = "
// 								+ operationsQueue[i].timestamp
// 								+ " data.timestamp: " + operationRec.timestamp);
// 						operationsQueue.splice(i, 1);
// 					}
// 				}

// 				// If there are other operations in queue then send next operation to server.
// 				let nextOpToSend = operationsQueue.shift();
// 				if (nextOpToSend) {
// 					send(nextOpToSend);
// 				}

// 			} else {
// 				operationRec = transform(operationRec);
// 				applyOperation(operationRec);

// 				updateVersion(operationRec["versionAfterThisOp"]);
// 			}
// 		}
// /**
//  * If there are any operations awaiting in queue, 
//  * then transform currentOp from awaiting operations.
//  */
// function transform(currentOp) {
// 	for (let i = 0; i < operationsQueue.length; i++) {
// 		let pastOp = operationsQueue[i];
// 		console.log("transform check past op - " + pastOp)
// 		// If past operation was at index before currentOp then adjust position, else keep currentOp as is.
// 		if (pastOp != null && pastOp.pos <= currentOp.pos) {
// 			console.log("Position is before so change");
// 			let position = currentOp.pos;
// 			if ("INSERT" === pastOp.action) {
// 				position = position + 1;
// 			} else if ("DELETE" === pastOp.action) {
// 				position = position - 1;
// 			}
// 			console.log("New position - " + position);
// 			currentOp.pos = position;
// 		} else {
// 			console.log("Position not before so no change - ");
// 		}
// 	}
// 	console.log("transform after = " + JSON.stringify(currentOp));
// 	return currentOp;
// }

// function applyOperation(data) {
//     // Apply operation to text area
//     let text = editorTextArea.val();
//     if ("INSERT" === data.action) {
//         content = content.substring(0, data.pos) + data.chr
//                 + content.substring(data.pos);
//     } else if ("DELETE" === data.action) {
//         content = content.substring(0, data.pos)
//                 + content.substring(data.pos + 1);
//     }
// 	console.log("New content after aplying the operation : " + content);
// }

// function updateVersion(newVersion) {
// 	console.log("newVersion = " + newVersion);
// 	// Update global variable documentVersion & also set display version.
// 	documentVersion = newVersion;
// }


// function main(){
// 	let jwt = readLine();
//     let uid = parseInt(readLine(), 10) ;
//     let docid = parseInt(readLine(), 10);
// 	ws = new WebSocket("ws://localhost:8088:/websocket/otserver?jwt=" + jwt + "&docid=" + docid + "&uid=" + uid);

// // Javascript callback function when connection is established. 
// ws.onopen = function() {
// 	console.log("Openened connection to websocket");
// }

// // Javascript callback function when messages is received from server.
// ws.onmessage = function(msg) {
// 	msgData = msg.data;
// 	console.log("On Message = " + msg + " msgData: " + msgData)
//     let data = JSON.parse(msgData);

//     if(Object.keys(data).length === 4){ // the first message , a document
//         content = data.content;
//         documentVersion = data.version;
//         name = data.name;
//         doc_id = data.doc_id;

//         currPos = content.length;
//     }else if(Object.keys(data).length === 9){ // it's an operation

//         let sessionId = '';
//         let chr = '';
//         let versionBeforeThisOp = 0;
//         let versionAfterThisOp = 0;
//         let action = '';
//         let pos = 0;
//         let isAck = false;
//         let timestamp = 0;
//         let operation_doc_id = 0;

//         sessionId = data.sessionId;
//         chr = data.character;
//         versionBeforeThisOp = parseInt(data.versionBeforeUpdate);
//         versionAfterThisOp = parseInt(data.versionAfterUpdate);
//         action = data.Action;
//         pos = parseInt(data.pos);
//         isAck = data.isAck;
//         timestamp = parseInt(data.timestamp);
//         operation_doc_id = parseInt(data.docId);

//         const operationRec = {
// 			sessionId : sessionId,
// 			chr : chr,
// 			versionBeforeThisOp : versionBeforeThisOp,
// 			versionAfterThisOp : versionAfterThisOp,
// 			action : action,
// 			pos : pos,
// 			isAck : isAck,
// 			timestamp : timestamp,
// 			operation_doc_id : operation_doc_id
// 		}

// 	    processReceivedOperation(operationRec);
//     } 
// }

// // Javascript callback function when connection is closed.
// ws.onclose = function(msg) {
// 	console.log("Closed connection to websocket");
// }

// while(true){
// 	handleKeyPress();
// }


// }

// main();