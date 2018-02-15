import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import {IonicErrorHandler, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SplashScreen} from "@ionic-native/splash-screen";
import {HTTP} from "@ionic-native/http";
import {Network} from "@ionic-native/network";
import {NativeStorage} from "@ionic-native/native-storage";
import {ErrorHandler} from "@angular/core";
import {SettingsProvider} from "../providers/settings/settings";
import {ConnectionProvider} from "../providers/connection/connection";
import {MinerProvider} from "../providers/miner/miner";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Vibration} from "@ionic-native/vibration";
import {Push} from "@ionic-native/push";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {MatExpansionModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Component: Root Component', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [MyApp],

      providers: [
        SplashScreen,
        HTTP,
        Network,
        NativeStorage,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        SettingsProvider,
        ConnectionProvider,
        MinerProvider,
        LocalNotifications,
        Vibration,
        Push,
        HttpClient
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule,
        HttpClientModule,
        MatExpansionModule,
        BrowserAnimationsModule
      ]

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(MyApp);
    comp    = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('is created', () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();

  });

  it('initialises with a root page of HomePage', () => {
    expect(comp['rootPage']).toBe(HomePage);
  });

});
