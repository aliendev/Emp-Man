function(doc) {
    if (doc._id.substr(0,7) === "empman_") {
        emit(doc._id, {
            "fname": 		doc.fname,
			"lname": 		doc.lname,
			"hired": 		doc.hired,
			"created": 		doc.created,
			"jobStatus": 	doc.jobStatus,
			"department": 	doc.department,
			"position": 	doc.position,
			"exp": 			doc.exp,
			"swipeid": 		doc.swipeid,
			"phoneExt": 	doc.phoneExt,
			"repTag": 		doc.repTag,
			"vmpass": 		doc.vmpass,
			"compNumber": 	doc.compNumber,
			"netid": 		doc.netid,
			"netPass": 		doc.netPass,
			"emailid": 		doc.emailid,
			"emailPass": 	doc.emailPass,
			"emailAddress": doc.emailAddress,
			"pandionid": 	doc.pandionid,
			"pandionpass": 	doc.pandionpass,
			"os": 			doc.os,
			"notes": 		doc.notes            
        });
    };
};

