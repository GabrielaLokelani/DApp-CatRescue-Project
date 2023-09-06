$(document).ready(function() {
    try {
      window.ethereum.enable();
    } catch (e) {
      alert("Access Denied.");
    }
  
    const catRescueContractAddress = "0x380B7AD926e048eDDFD0EB28E0d3E31c5636ac80";
  
    const catRescueContractABI = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_catName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_catGender",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "_catAge",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_hash",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "_available",
            "type": "bool"
          }
        ],
        "name": "add",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "personName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "personGender",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "personAge",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "_catsName",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "catIndex",
            "type": "uint8"
          }
        ],
        "name": "adopt",
        "outputs": [
          {
            "internalType": "bool",
            "name": "adoptionSuccess",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "cat",
        "outputs": [
          {
            "internalType": "string",
            "name": "catsName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "age",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "hash",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "available",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint8",
            "name": "catIndex",
            "type": "uint8"
          }
        ],
        "name": "getCat",
        "outputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gender",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "age",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_hash",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "available",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getCatsCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "catCount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getDonationBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "donationTotal",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint8",
            "name": "catIndex",
            "type": "uint8"
          }
        ],
        "name": "returnCatToShelter",
        "outputs": [
          {
            "internalType": "bool",
            "name": "returnSuccess",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawDonations",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
    ];
  
    const IPFS = window.IpfsApi("localhost", "5001");
    const Buffer = IPFS.Buffer;
  
    // === User Interface Handlers Start ===
  
    $("#linkHome").click(function() {
      showView("viewHome");
    });
  
    $("#linkAddCat").click(function() {
      showView("viewAddCat");
    });
  
    $("#linkAdoptCat").click(function() {
      showView("viewAdoptCat");
    });
  
    $("#linkGetCats").click(function() {
      $("#viewGetCats div").remove();
      showView("viewGetCats");
      viewGetCats();
    });
  
    $("#linkGetSpecificCat").click(function() {
      showView("viewGetSpecificCat");
      viewGetSpecificCat();
    });  

    $("#linkDonate").click(function() {
      showView("viewDonateToCatRescue");
    });

    $("#linkOwnersControls").click(function() {
      showView("viewOwnersControls");
    });

    $("#linkReturnCat").click(function() {
      showView("viewReturnCat");
    });
  
  
    // Attach AJAX "loading" event listener
    $(document).on({
      ajaxStart: function() {
        $("#loadingBox").show();
      },
      ajaxStop: function() {
        $("#loadingBox").hide();
      }
    });
  
    function showView(viewName) {
      // Hide all views and show the selected view only
      $("main > section").hide();
      $("#" + viewName).show();
    }
  
    function showInfo(message) {
      $("#infoBox>p").html(message);
      $("#infoBox").show();
      $("#infoBox>header").click(function() {
        $("#infoBox").hide();
      });
    }
  
    function showError(errorMsg) {
      $("#errorBox>p").html("Error: " + errorMsg);
      $("#errorBox").show();
      $("#errorBox>header").click(function() {
        $("#errorBox").hide();
      });
    }
  
    $("#catUploadButton").click(rescueCat);
    $("#catAdoptButton").click(adoptCat);
    $("#catViewButton").click(viewGetSpecificCat);
    $("#donationButton").click(viewDonateToCatRescue);
    $("#donationTotalButton").click(viewOwnersControlsTotal);
    $("#donationCollectButton").click(viewOwnersControlsWithdraw);
    $("#catReturnButton").click(viewReturnCat);
  
    // === User Interface Interactions End ===
  
  
    // ========== ADD / RESCUE A CAT TO THE SHELTER ==========
  
    function rescueCat() {
      if ($("#catDocumentForUpload")[0].files.length === 0) {
        showError("Please select a file to upload!");
        return;
      }
  
      let fileReader = new FileReader();
      fileReader.onload = function () {
        if (typeof web3 === "undefined") {
          showError(
            "Please install Metamask to access the Ethereum Web3 API from your browser!"
          );
          return;
        }
  
        let fileBuffer = Buffer.from(fileReader.result);
        let contract = web3.eth.contract(catRescueContractABI).at(catRescueContractAddress);
        console.log(contract);
  
        IPFS.files.add(fileBuffer, (err, result) => {
          if (err) {
            showError(err);
            return;
          }
          if (result) {
            let ipfsHash = result[0].hash;
            let catName = $("#CatNameForUpload").val();
            let catGender = $("#CatGenderForUpload").val();
            let catAge = $("#CatAgeForUpload").val();
            let catDescription = $("#CatDescriptionForUpload").val();
            let available = $("#CatAvailabilityForUpload").val();
            contract.add(catName, catGender, catAge, catDescription, ipfsHash, available, (error, txHash) => {
              if (error) {
                showError("Smart contract call failed to rescue cat into the shelter: " + error);
                return;
              }
  
              if (txHash) {
                showInfo(
                  `Cat named: ${catName} with image: ${ipfsHash} successfully added to the shelter! Transaction hash: ${txHash}`
                );
                return;
              }
            });
          }
        });
      };
  
      fileReader.readAsArrayBuffer($("#catDocumentForUpload")[0].files[0]);
  
    }
  
    // ========== ADOPT A CAT ==========
  
    function adoptCat() {
      if (typeof web3 === "undefined") {
        showError("Please install Metamask to access the Ethereum Web3 API from your browser!");
        return;
      }
  
      let contract = web3.eth.contract(catRescueContractABI).at(catRescueContractAddress);
  
      let customerName = $("#customerNameForAdoption").val();
      let customerGender = $("#customerGenderForAdoption").val();
      let customerAge = $("#customerAgeForAdoption").val();
      let catName = $("#catNameForAdoption").val();
      let index = $("#catIndexForAdoption").val();
      contract.adopt(customerName, customerGender, customerAge, catName, index, (error, txHash) => {
        if (error) {
          showError("Smart contract call failed to adopt: " + error);
          return;
        }
  
        if (txHash) {
          showInfo(
            `Congragulations! You have successfully adopted ${catName}! Here is the Transaction Hash: ${txHash}`
          );
          return;
        }
      });
    }
  
    // ========== GET ALL CATS ==========
  
    function viewGetCats() {
      if (typeof web3 === "undefined") {
        showError("Please install Metamask to access the Ethereum Web3 API from your browser!");
        return;
      }
  
      let contract = web3.eth.contract(catRescueContractABI).at(catRescueContractAddress);
  
      contract.getCatsCount((err, res) => {
        if(err) {
          showError("Smart contract failed to get cat's count: " + err);
          return;
        }
  
        let catsCount = res.toNumber();
        console.log("this is catsCount : ", catsCount);
        
  
        if (catsCount > 0) {
          let html = $(`<div>`);
          let html1 = $(`<div class="row">`);
          html.append(html1);
          for (let index = 0; index < catsCount; index++) {
            contract.getCat(index, (error, result) => {
              if (error) {
                showError("Smart contract failed to retrieve all cals: " + error);
                return;
              }
              let catsIndex = index;
              console.log("this is the cats index: " + catsIndex);
              let catName = result[0];
              console.log("this is result[0] : ", result[0]);
              let catGender = result[1];
              let catAge = result[2];
              let catDescription = result[3];
              let ipfsHash = result[4];
              let available = result[5];
              // let divRow = $(`<div class="row">`);
              // let divCol = $(`<div class="col-sm-4">`);
              let html2 = $(`<div class="col-sm-4">`);
              let div = $(`<div class="card" style="background-color: #e0e0e0;">`);
              let divBody = $(`<div class="card-body">`);
              let url = `http://localhost:8080/ipfs/${ipfsHash}`;
              
              // divRow.append(divCol);
              div.append($(`<img src="${url}" class="card-img-top" style="max-height: 430px; width: 450px;" alt="${catName}'s image"/>`));
              divBody.append($(`<h5 class="card-title">Cat's Name: ${catName}<h5>`));
              divBody.append($(`<p class="card-text">Cat's Gender: ${catGender}<p>`));
              divBody.append($(`<p class="card-text">Cat's Age: ${catAge}<p>`));
              divBody.append($(`<p class="card-text">Cat's Description: ${catDescription}<p>`));
              divBody.append($(`<p class="card-text">Cat's Available for Adoption: ${available}<p>`));
              divBody.append($(`<p class="card-text">Cat's Index: ${catsIndex}<p>`));
              divBody.append("</div>");
              div.append(divBody);
              div.append("</div>");
              // divCol.append(div);
              // divCol.append("</div>");
              // divRow.append("</div>");
              html2.append(div);
              html2.append("</div>");
              html1.append(html2);
              html.append(html1);
              // html.append(div);  
            });
          }
    
          html1.append("</div>");
          html.append("</div>");
          $("#viewGetCats").append(html);
        } else {
          $("#viewGetCats").append("<div> No cats currently in the shelter! Please come back another time. </div>");
        }
      });
    }
  
    // ========== GET A SPECIFIC CAT ===========
  
    function viewGetSpecificCat() {
      if (typeof web3 === "undefined") {
        showError("Please install Metamask to access the Ethereum Web3 API from your browser!");
        return;
      }
  
      let contract = web3.eth.contract(catRescueContractABI).at(catRescueContractAddress);
  
      let index = Number($("#catIndexForView").val());

      catsIndex = Number(index);
      // console.log("This is cats index", catsIndex);

      let html = $(`<div>`);
      let html1 = $(`<div class="row">`);
      html.append(html1);
  
      contract.getCat(catsIndex, (error, result) => {
        if (error) {
          showError("Smart contract failed to view a specific cat: " + error);
          return;
        }
        let catName = result[0];
        console.log("this is result[0]", result[0]);
        let catGender = result[1];
        let catAge = result[2];
        let catDescription = result[3];
        let ipfsHash = result[4];
        let available = result[5];
        let html2 = $(`<div class="col-sm-5">`);
        let div = $(`<div class="card" style="background-color: #e0e0e0;">`);
        let divBody = $(`<div class="card-body">`);
        let url = `http://localhost:8080/ipfs/${ipfsHash}`;
  
        div.append($(`<img src="${url}" class="card-img-top" style="max-height: 530px; width: 550px;" alt="${catName} image"/>`));
        divBody.append($(`<h5 class="card-title">Cat's Name: ${catName}<h5>`));
        divBody.append($(`<p class="card-text">Cat's Gender: ${catGender}<p>`));
        divBody.append($(`<p class="card-text">Cat's Age: ${catAge}<p>`));
        divBody.append($(`<p class="card-text">Cat's Description: ${catDescription}<p>`));
        divBody.append($(`<p class="card-text">Cat's Available for Adoption: ${available}<p>`));
        divBody.append($(`<p class="card-text">Cat's Index: ${catsIndex}<p>`));
        divBody.append("</div>");
        div.append(divBody);
        div.append("</div>");
        html2.append(div);
        html2.append("</div>");
        html1.append(html2);
        html.append(html1);       
      });

      html1.append("</div>");
      html.append("</div>");
      $("#viewGetSpecificCat").append(html);
    }

    // ========== DONATE TO THE CAT RESCUE ===========

    function viewDonateToCatRescue() {
      if (typeof web3 === "undefined") {
        showError("Please install Metamask to access the Ethereum Web3 API from your browser!");
        return;
      }
  
      let contract = web3.eth.contract(catRescueContractABI).at(catRescueContractAddress);

      let index = Number($("#amountToDonate").val());
      donationValue = Number(index);

      // donate to the cat rescue
      contract.donate(donationValue, (error, txHash) => {
        if (error) {
          showError("Smart contract failed to donate: " + error);
          return;
        }

        if (txHash) {
          showInfo(
            `Congragulations! You have successfully donated ${donationValue} ETH to the Cat Rescue! The kitties appreciate your donation. Here is the Transaction Hash: ${TxHash}`
          );
          return;
        } 
      });
    }

    function viewOwnersControlsTotal() {
      if (typeof web3 === "undefined") {
        showError("Please install Metamask to access the Ethereum Web3 API from your browser!");
        return;
      }
  
      let contract = web3.eth.contract(catRescueContractABI).at(catRescueContractAddress);

        // owner can get the donation balance
        contract.getDonationBalance((error, result) => {
          if (error) {
            showError("Smart contract failed to get donation balance: " + error);
            return;
          }

          if (result) {
            showInfo(
              `The Cat Rescue has a donation balance totalling ${result} ETH to the Cat Rescue!`
            );
            return;
          }
        });
    }

    function viewOwnersControlsWithdraw() {
      if (typeof web3 === "undefined") {
        showError("Please install Metamask to access the Ethereum Web3 API from your browser!");
        return;
      }
  
      let contract = web3.eth.contract(catRescueContractABI).at(catRescueContractAddress);

          // owner of cat rescue can withdrawl donation balance
          contract.withdrawDonations((error, txHash) => {
            if (error) {
              showError("Smart contract failed to withdraw donations: " + error);
              return;
            }

            if (txHash) {
              showInfo(
                `Congragulations! You have successfully withdrawn the balance of the Cat Rescue donations! Here is the Transaction Hash: ${txHash}`
              );
              return;
            } 
          });
    }

        // ========== RETURN CAT TO THE CAT RESCUE ===========

        function viewReturnCat() {
          if (typeof web3 === "undefined") {
            showError("Please install Metamask to access the Ethereum Web3 API from your browser!");
            return;
          }
      
          let contract = web3.eth.contract(catRescueContractABI).at(catRescueContractAddress);

          let catIndex = $("#catIndexForReturn").val();

          contract.returnCatToShelter(catIndex, (error, txHash) => {
            if (error) {
              showError("Smart contract failed to return cat: " + error);
              return;
            }

            if (txHash) {
              showInfo(
                `Your return is successful, were sorry the adoption did not work out. Please consider adopting one of our other amazing kitties! Here is the Transaction Hash: ${txHash}`
              )
            }
          });
        }
  
  });


// ***** this has the original styling *****
  // function viewGetSpecificCat() {
  //   if (typeof web3 === "undefined") {
  //     showError("Please install Metamask to access the Ethereum Web3 API from your browser!");
  //     return;
  //   }

  //   let contract = web3.eth.contract(catRescueContractABI).at(catRescueContractAddress);

  //   let index = Number($("#catIndexForView").val());

  //   catsIndex = Number(index);
  //   // console.log("This is cats index", catsIndex);

  //   let html = $("<div>");

  //   contract.getCat(catsIndex, (error, result) => {
  //     if (error) {
  //       showError("Smart contract failed to view a specific cat: " + error);
  //       return;
  //     }
  //     let catName = result[0];
  //     console.log("this is result[0]", result[0]);
  //     let catGender = result[1];
  //     let catAge = result[2];
  //     let catDescription = result[3];
  //     let ipfsHash = result[4];
  //     let available = result[5];
  //     let div = $(`<div class="card" style="max-width: 420px;">`);
  //     let divBody = $(`<div class="card-body">`);
  //     let url = `http://localhost:8080/ipfs/${ipfsHash}`;

  //     div.append($(`<img src="${url}" class="card-img-top" style="height: 300px;" alt="${catName} image"/>`));
  //     divBody.append($(`<h5 class="card-title">Cat's Name: ${catName}<h5>`));
  //     divBody.append($(`<p class="card-text">Cat's Gender: ${catGender}<p>`));
  //     divBody.append($(`<p class="card-text">Cat's Age: ${catAge}<p>`));
  //     divBody.append($(`<p class="card-text">Cat's Description: ${catDescription}<p>`));
  //     divBody.append($(`<p class="card-text">Cat's Available for Adoption: ${available}<p>`));
  //     divBody.append($(`<p class="card-text">Cat's Index: ${catsIndex}<p>`));
  //     div.append(divBody);
  //     html.append(div);      
  //   });
  //   html.append("</div>");
  //   $("#viewGetSpecificCat").append(html);
  // }