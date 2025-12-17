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
        address payable draudejoAddr;
    }

    struct Klientas {
        address payable klientoAddr;
        uint amzius;
        sveikatosTipas sveikatosBukle;
        //vairavimo istorija
        profesijosTipas profesija;
    }

    struct Menesis {
        uint suma;
        bool sumokejo;
        uint ivykiuSkaicius;
        uint reikiamaSuma;
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
   uint public amount1 = 0;
   uint public amount2 = 0;

    constructor(address _klientoAddr, uint _amzius, sveikatosTipas _sveikata, profesijosTipas _profesija) {
            require(_amzius >= 18, "Klientas turi buti pilnametis");
            require(msg.sender != _klientoAddr, "Draudejas negali buti klientas");

            draudejas = Draudejas({draudejoAddr: payable(msg.sender)});
            klientas = Klientas({klientoAddr: payable(_klientoAddr), amzius: _amzius, sveikatosBukle: _sveikata, profesija: _profesija});
            skaiciuotiSuma();
    }

    function skaiciuotiSuma() public {
            require(msg.sender == draudejas.draudejoAddr, "Skaiciuoti suma gali tik draudejas");
            uint reikiamaSuma = (klientas.amzius / 10) * 100000000000000000 + (uint(klientas.profesija) + 1) * 100000000000000000 + (uint(klientas.sveikatosBukle) + 1) * 100000000000000000;
            menesiai.push(Menesis({suma: reikiamaSuma, sumokejo: false, ivykiuSkaicius: 0, reikiamaSuma: 0, ismoketaSuma: 0}));
            emit gauta(reikiamaSuma, msg.sender);
    }

    function sumoketi() public payable {
        require(msg.sender == klientas.klientoAddr, "Sumoketi gali tik klientas");
        require(menesiai.length > 0, "Draudejas nepateike nei vienos sumos");
        for (uint i=0; i < menesiai.length; i++) {
            if (menesiai[i].sumokejo == false) {
                require(msg.value == menesiai[i].suma, "Mokejimo suma netinkama");
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
        menesiai[uint(n)].ivykiuSkaicius++;
        menesiai[uint(n)].reikiamaSuma += (uint(ivykioLygis) + 1) * 1000000000000000000;
    }

    function ismoka(uint n) public payable {
        require(msg.sender == draudejas.draudejoAddr, "Ismoketi gali tik draudejas");
        require(menesiai.length >= n, "Nera pateikta sio menesio mokejimo");
        require(msg.value == menesiai[n].reikiamaSuma, "Mokejimo suma netinkama");
        menesiai[n].ismoketaSuma += menesiai[n].reikiamaSuma;
        emit sumoketa(menesiai[n].ismoketaSuma, draudejas.draudejoAddr);
    }

    function pervestiPinigus() public payable {
        require(msg.sender == draudejas.draudejoAddr, "Pinigu pervedimo funkcija iskviesti gali tik draudejas");
        require(menesiai[menesiai.length - 1].sumokejo == true, "Klientas turi buti sumokejes visus menesius");
        require(menesiai.length > 0, "Draudejas nepateike nei vienos sumos");
        uint klientoSuma = (menesiai[0].suma * menesiai.length);

        amount1 = address(this).balance;
        require(amount1 > klientoSuma, "Sutartyje nera pakankamai lesu");

        (bool success, ) = draudejas.draudejoAddr.call{value: klientoSuma}("");
        require(success, "Transakcija nepavyko");

        amount2 = address(this).balance;
        (success, ) = klientas.klientoAddr.call{value: amount2}("");
        require(success, "Transakcija nepavyko");

    }

    function getKlientas() external view returns (address klientoAddr, uint amzius, sveikatosTipas sveikata, profesijosTipas profesija) {
    Klientas storage k = klientas;
    return (k.klientoAddr, k.amzius, k.sveikatosBukle, k.profesija);
    }

    function getDraudejas() external view returns (address draudejoAddr) {
    Draudejas storage d = draudejas;
    return (d.draudejoAddr);
    }

    function gautiMenesi(uint i) public view returns(uint suma, bool sumokejo, uint ivykiuSkaicius, uint reikiamaSuma, uint ismoketaSuma) {
        Menesis storage m = menesiai[i];
        return (m.suma, m.sumokejo, m.ivykiuSkaicius, m.reikiamaSuma, m.ismoketaSuma);
    }

    function gautiBalansa() public view returns(uint) {
        return address(this).balance;
    }
}