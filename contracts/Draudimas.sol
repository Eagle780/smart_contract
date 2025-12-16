// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Draudimas
 * @dev Kliento apdraudimo implementacija
 */
contract Draudimas {

    event gauta(uint suma, address draudejas);
    event sumoketa(uint suma, address moketojas);
    event uzregistruota(ivykioTipas ivykis, address klientas);

    struct Draudejas {
        address draudejoAddr;
    }

    struct Klientas {
        address klientoAddr;
        uint amzius;
        sveikatosTipas sveikatosBukle;
        //vairavimo istorija
        profesijosTipas profesija;
    }

    struct Menesis {
        uint suma;
        bool sumokejo;
        uint ivykiuSkaicius;
        uint ismoketaSuma;
    }

    enum sveikatosTipas {
        Tobula,
        Gera,
        Vidutine,
        Prasta,
        Bloga
    }

    enum profesijosTipas {
        Studentas,
        Protinis,
        Fizinis,
        Bedarbis
    }

    enum ivykioTipas {
        Smulkus,
        Vidutinis,
        Stiprus
    }

   Draudejas public draudejas;
   Klientas public klientas;
   Menesis[] public menesiai;

    constructor(address _klientoAddr, uint _amzius, sveikatosTipas _sveikata, profesijosTipas _profesija) {
            require(_amzius >= 18, "Klientas turi buti pilnametis");
            require(msg.sender != _klientoAddr, "Draudejas negali buti klientas");

            draudejas = Draudejas({draudejoAddr: msg.sender});
            klientas = Klientas({klientoAddr: _klientoAddr, amzius: _amzius, sveikatosBukle: _sveikata, profesija: _profesija});
            skaiciuotiSuma();
    }

    function skaiciuotiSuma() public {
            require(msg.sender == draudejas.draudejoAddr, "Skaiciuoti suma gali tik draudejas");
            uint reikiamaSuma = (klientas.amzius / 10) * 100 + (uint(klientas.profesija) + 1) * 100 + (uint(klientas.sveikatosBukle) + 1) * 100;
            menesiai.push(Menesis({suma: reikiamaSuma, sumokejo: false, ivykiuSkaicius: 0, ismoketaSuma: 0}));
            emit gauta(reikiamaSuma, msg.sender);
    }

    function sumoketi() public payable {
        require(msg.sender == klientas.klientoAddr, "Sumoketi gali tik klientas");
        require(menesiai.length > 0, "Draudejas nepateike nei vienos sumos");
        for (uint i=0; i < menesiai.length; i++) {
            if (menesiai[i].sumokejo == false) {
                menesiai[i].sumokejo = true;
                emit sumoketa(menesiai[i].suma, msg.sender);
                break;
            }
        }
    }

    function uzregistruotiIvyki(ivykioTipas ivykioLygis) public {
        require(msg.sender == klientas.klientoAddr, "Uzregistruoti ivyki gali tik klientas");
        require(menesiai.length > 0, "Draudejas nepateike nei vienos sumos");
        int n = -1;
        for (uint i=0; i < menesiai.length; i++) {
            if (menesiai[i].sumokejo == true) {
                n = int(i);
            }
        }
        require(n != -1, "nera uzmoketo menesio");
        ismoka(uint(n), ivykioLygis);
        emit sumoketa(menesiai[uint(n)].suma, msg.sender);
    }

    function ismoka(uint n, ivykioTipas ivykioLygis) public payable {
        menesiai[n].ismoketaSuma = menesiai[n].ismoketaSuma + (uint(ivykioLygis) + 1) * 100;
        menesiai[n].ivykiuSkaicius = menesiai[n].ivykiuSkaicius + 1;
        emit sumoketa(menesiai[n].ismoketaSuma, draudejas.draudejoAddr);
    }

    function getKlientas() external view returns (address klientoAddr, uint amzius, sveikatosTipas sveikata, profesijosTipas profesija) {
    Klientas storage k = klientas;
    return (k.klientoAddr, k.amzius, k.sveikatosBukle, k.profesija);
    }

    function getDraudejas() external view returns (address draudejoAddr) {
    Draudejas storage d = draudejas;
    return (d.draudejoAddr);
    }

    function gautiMenesi(uint i) public view returns(uint suma, bool sumokejo, uint ivykiuSkaicius, uint ismoketaSuma) {
        Menesis storage m = menesiai[i];
        return (m.suma, m.sumokejo, m.ivykiuSkaicius, m.ismoketaSuma);
    }
}