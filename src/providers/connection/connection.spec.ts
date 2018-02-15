import {TestBed, ComponentFixture, async, inject} from '@angular/core/testing';
import {ConnectionProvider} from "./connection";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Vibration} from "@ionic-native/vibration";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {Push} from "@ionic-native/push";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AlertControllerMock, LoadingControllerMock, NetworkMock, PlatformMock, ToastControllerMock} from "ionic-mocks";
import {Account} from "../../Types/Account";
import {MatExpansionModule} from '@angular/material/expansion';


describe('Provider: ConnectionProvider', () => {
  const connectionString = "http://smdom.ua.local:8080/";
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        Push,
        LocalNotifications,
        Vibration
      ],
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        MatExpansionModule,
      ]

    }).compileComponents();

  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('testing login request', inject(
    [HttpClient, HttpTestingController], (httpClient, httpMock: HttpTestingController, push: Push, localNotifications: LocalNotifications, vibration: Vibration) => {

      let connectionProvider = new ConnectionProvider(
        NetworkMock.instance("Wifi"),
        LoadingControllerMock.instance(),
        ToastControllerMock.instance(),
        PlatformMock.instance(),
        push,
        localNotifications,
        vibration,
        httpClient,
        AlertControllerMock.instance()
      );

      const answer = "test token";
      connectionProvider.login(new Account("test user","pass")).then(transferAnswer =>expect(transferAnswer).toEqual(answer));
      const req = httpMock.expectOne(connectionString + '/loginMobile');
      req.flush({error: null, status: true, data: "test token"});
    }));



  it('testing getStoredMiners request', inject(
    [HttpClient, HttpTestingController], (httpClient, httpMock: HttpTestingController, push: Push, localNotifications: LocalNotifications, vibration: Vibration) => {

      let connectionProvider = new ConnectionProvider(
        NetworkMock.instance("Wifi"),
        LoadingControllerMock.instance(),
        ToastControllerMock.instance(),
        PlatformMock.instance(),
        push,
        localNotifications,
        vibration,
        httpClient,
        AlertControllerMock.instance()
      );

      const answer = {
          miner: {
            minerId:"1",
            minerName:"testMiner"
          },
        message: {
          gpus:[{temperature:95.356,fanSpeed:75.639},{temperature:78.76,fanSpeed:69.520}],
          uptime:1205,
          pool:"tested pool",
          invalidEth:1,
          invalidDcr:2,
          switchesEth:3,
          switchesDcr:5,
          version:"1.10",
          status:true,
          comments:"too old comments",
          speedEth:21.36,
          acceptedSharesEth:20,
          rejectedSharesEth:8,
          detaliedEth:[10,11.36],
          speedDcr:2.5,
          acceptedSharesDcr:4,
          rejectedSharesDcr:8,
          detaliedDcr:[1.25,1.25]
        },
        settings:[
          {
            name:"Temperature",
            type: "C",
            enabled:true,
            low_value:-1,
            high_value: 95,
            muted:false
          },
          {
            name:"Fan Speed",
            type: "%",
            enabled:true,
            low_value:20,
            high_value: -1,
            muted:false
          },
          {
            name:"Eth Speed",
            type: "MH/s",
            enabled:true,
            low_value:0.5,
            high_value: -1,
            muted:true
          },
          {
            name:"Dcr Speed",
            type: "MH/s",
            enabled:false,
            low_value:-1,
            high_value: -1,
            muted:true
          }
        ]
      };

      connectionProvider.getStoredMiners().then(miners =>expect(miners).toEqual(answer));
      const req = httpMock.expectOne(connectionString + '/getMinersMobile');
      req.flush({error: null, status: true, data: answer});
    }));


  it('testing sendDeviceId request', inject(
    [HttpClient, HttpTestingController], (httpClient, httpMock: HttpTestingController, push: Push, localNotifications: LocalNotifications, vibration: Vibration) => {

      let connectionProvider = new ConnectionProvider(
        NetworkMock.instance("Wifi"),
        LoadingControllerMock.instance(),
        ToastControllerMock.instance(),
        PlatformMock.instance(),
        push,
        localNotifications,
        vibration,
        httpClient,
        AlertControllerMock.instance()
      );

      const answer = true;
      connectionProvider.sendDeviceId(new Account("robo","111"),"test deviceId").then(res=>{expect(res).toBeTruthy()});
      const req = httpMock.expectOne(connectionString + '/setDeviceId');
      req.flush({error: null, status: true, data: answer});
    }));


  it('testing initPushNotification request', inject(
    [HttpClient, HttpTestingController], (httpClient, httpMock: HttpTestingController, push: Push, localNotifications: LocalNotifications, vibration: Vibration) => {

      let connectionProvider = new ConnectionProvider(
        NetworkMock.instance("Wifi"),
        LoadingControllerMock.instance(),
        ToastControllerMock.instance(),
        PlatformMock.instance(),
        push,
        localNotifications,
        vibration,
        httpClient,
        AlertControllerMock.instance()
      );
        //не могу протестировать т.к. платформа не подходит
      //connectionProvider.initPushNotification(new Settings(true,true,false)).then(res=>{expect(res).toBeTruthy()})

    }));

});
