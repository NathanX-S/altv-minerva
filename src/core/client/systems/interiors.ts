import * as alt from '@altv/client';
import natives from '@altv/natives';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';

function fixMissingInteriors() {
    alt.Streaming.requestIpl('bh1_47_joshhse_unburnt');
    alt.Streaming.requestIpl('ex_dt1_02_office_02b');
    alt.Streaming.requestIpl('chop_props');
    alt.Streaming.requestIpl('FIBlobby');
    alt.Streaming.removeIpl('FIBlobbyfake');
    alt.Streaming.requestIpl('FBI_colPLUG');
    alt.Streaming.requestIpl('FBI_repair');
    alt.Streaming.requestIpl('v_tunnel_hole');
    alt.Streaming.requestIpl('TrevorsMP');
    alt.Streaming.requestIpl('TrevorsTrailer');
    alt.Streaming.requestIpl('TrevorsTrailerTidy');
    alt.Streaming.removeIpl('farm_burnt');
    alt.Streaming.removeIpl('farm_burnt_lod');
    alt.Streaming.removeIpl('farm_burnt_props');
    alt.Streaming.removeIpl('farmint_cap');
    alt.Streaming.removeIpl('farmint_cap_lod');
    alt.Streaming.requestIpl('farm');
    alt.Streaming.requestIpl('farmint');
    alt.Streaming.requestIpl('farm_lod');
    alt.Streaming.requestIpl('farm_props');
    alt.Streaming.requestIpl('facelobby');
    alt.Streaming.removeIpl('CS1_02_cf_offmission');
    alt.Streaming.requestIpl('CS1_02_cf_onmission1');
    alt.Streaming.requestIpl('CS1_02_cf_onmission2');
    alt.Streaming.requestIpl('CS1_02_cf_onmission3');
    alt.Streaming.requestIpl('CS1_02_cf_onmission4');
    alt.Streaming.requestIpl('v_rockclub');
    alt.Streaming.requestIpl('v_janitor');
    alt.Streaming.removeIpl('hei_bi_hw1_13_door');
    alt.Streaming.requestIpl('bkr_bi_hw1_13_int');
    alt.Streaming.requestIpl('ufo');
    alt.Streaming.requestIpl('ufo_lod');
    alt.Streaming.requestIpl('ufo_eye');
    alt.Streaming.removeIpl('v_carshowroom');
    alt.Streaming.removeIpl('shutter_open');
    alt.Streaming.removeIpl('shutter_closed');
    alt.Streaming.removeIpl('shr_int');
    alt.Streaming.requestIpl('v_carshowroom');
    alt.Streaming.requestIpl('smboat');
    alt.Streaming.requestIpl('smboat_distantlights');
    alt.Streaming.requestIpl('smboat_lod');
    alt.Streaming.requestIpl('smboat_lodlights');
    alt.Streaming.requestIpl('cargoship');
    alt.Streaming.requestIpl('railing_start');
    alt.Streaming.removeIpl('sp1_10_fake_interior');
    alt.Streaming.removeIpl('sp1_10_fake_interior_lod');
    alt.Streaming.requestIpl('sp1_10_real_interior');
    alt.Streaming.requestIpl('sp1_10_real_interior_lod');
    alt.Streaming.removeIpl('id2_14_during_door');
    alt.Streaming.removeIpl('id2_14_during1');
    alt.Streaming.removeIpl('id2_14_during2');
    alt.Streaming.removeIpl('id2_14_on_fire');
    alt.Streaming.removeIpl('id2_14_post_no_int');
    alt.Streaming.removeIpl('id2_14_pre_no_int');
    alt.Streaming.removeIpl('id2_14_during_door');
    alt.Streaming.requestIpl('id2_14_during1');
    alt.Streaming.removeIpl('Coroner_Int_off');
    alt.Streaming.requestIpl('coronertrash');
    alt.Streaming.requestIpl('Coroner_Int_on');
    alt.Streaming.removeIpl('bh1_16_refurb');
    alt.Streaming.removeIpl('jewel2fake');
    alt.Streaming.removeIpl('bh1_16_doors_shut');
    alt.Streaming.requestIpl('refit_unload');
    alt.Streaming.requestIpl('post_hiest_unload');
    alt.Streaming.requestIpl('Carwash_with_spinners');
    alt.Streaming.requestIpl('KT_CarWash');
    alt.Streaming.requestIpl('ferris_finale_Anim');
    alt.Streaming.removeIpl('ch1_02_closed');
    alt.Streaming.requestIpl('ch1_02_open');
    alt.Streaming.requestIpl('AP1_04_TriAf01');
    alt.Streaming.requestIpl('CS2_06_TriAf02');
    alt.Streaming.requestIpl('CS4_04_TriAf03');
    alt.Streaming.removeIpl('scafstartimap');
    alt.Streaming.requestIpl('scafendimap');
    alt.Streaming.removeIpl('DT1_05_HC_REMOVE');
    alt.Streaming.requestIpl('DT1_05_HC_REQ');
    alt.Streaming.requestIpl('DT1_05_REQUEST');
    alt.Streaming.requestIpl('dt1_05_hc_remove');
    alt.Streaming.requestIpl('dt1_05_hc_remove_lod');
    alt.Streaming.requestIpl('FINBANK');
    alt.Streaming.removeIpl('DT1_03_Shutter');
    alt.Streaming.removeIpl('DT1_03_Gr_Closed');
    alt.Streaming.requestIpl('golfflags');
    alt.Streaming.requestIpl('airfield');
    alt.Streaming.requestIpl('v_garages');
    alt.Streaming.requestIpl('v_foundry');
    alt.Streaming.requestIpl('hei_yacht_heist');
    alt.Streaming.requestIpl('hei_yacht_heist_Bar');
    alt.Streaming.requestIpl('hei_yacht_heist_Bedrm');
    alt.Streaming.requestIpl('hei_yacht_heist_Bridge');
    alt.Streaming.requestIpl('hei_yacht_heist_DistantLights');
    alt.Streaming.requestIpl('hei_yacht_heist_enginrm');
    alt.Streaming.requestIpl('hei_yacht_heist_LODLights');
    alt.Streaming.requestIpl('hei_yacht_heist_Lounge');
    alt.Streaming.requestIpl('hei_carrier');
    alt.Streaming.requestIpl('hei_Carrier_int1');
    alt.Streaming.requestIpl('hei_Carrier_int2');
    alt.Streaming.requestIpl('hei_Carrier_int3');
    alt.Streaming.requestIpl('hei_Carrier_int4');
    alt.Streaming.requestIpl('hei_Carrier_int5');
    alt.Streaming.requestIpl('hei_Carrier_int6');
    alt.Streaming.requestIpl('hei_carrier_LODLights');
    alt.Streaming.requestIpl('bkr_bi_id1_23_door');
    alt.Streaming.requestIpl('lr_cs6_08_grave_closed');
    alt.Streaming.requestIpl('hei_sm_16_interior_v_bahama_milo_');
    alt.Streaming.requestIpl('CS3_07_MPGates');
    alt.Streaming.requestIpl('cs5_4_trains');
    alt.Streaming.requestIpl('v_lesters');
    alt.Streaming.requestIpl('v_trevors');
    alt.Streaming.requestIpl('v_michael');
    alt.Streaming.requestIpl('v_comedy');
    alt.Streaming.requestIpl('v_cinema');
    alt.Streaming.requestIpl('V_Sweat');
    alt.Streaming.requestIpl('V_35_Fireman');
    alt.Streaming.requestIpl('redCarpet');
    alt.Streaming.requestIpl('triathlon2_VBprops');
    alt.Streaming.requestIpl('jetstenativeurnel');
    alt.Streaming.requestIpl('Jetsteal_ipl_grp1');
    alt.Streaming.requestIpl('sf_musicrooftop');

    // Hospital Pillbox Interiors
    alt.Streaming.requestIpl('RC12B_Default');

    // Canyon
    alt.Streaming.requestIpl('canyonriver01');
    alt.Streaming.requestIpl('canyonriver01_lod');
    alt.Streaming.requestIpl('cs3_05_water_grp1');
    alt.Streaming.requestIpl('cs3_05_water_grp1_lod');
    alt.Streaming.requestIpl('trv1_trail_start');
    alt.Streaming.requestIpl('CanyonRvrShallow');

    // CASINO
    alt.Streaming.requestIpl('vw_casino_penthouse');
    alt.Streaming.requestIpl('vw_casino_main');
    alt.Streaming.requestIpl('vw_casino_carpark');
    alt.Streaming.requestIpl('vw_dlc_casino_door');
    alt.Streaming.requestIpl('vw_casino_door');
    alt.Streaming.requestIpl('hei_dlc_windows_casino');
    alt.Streaming.requestIpl('hei_dlc_casino_door');
    alt.Streaming.requestIpl('hei_dlc_casino_aircon');
    alt.Streaming.requestIpl('vw_casino_garage');

    let interiorID = natives.getInteriorAtCoords(1100.0, 220.0, -50.0);
    if (natives.isValidInterior(interiorID)) {
        natives.activateInteriorEntitySet(interiorID, '0x30240D11');
        natives.activateInteriorEntitySet(interiorID, '0xA3C89BB2');
        natives.refreshInterior(interiorID);
    }

    interiorID = natives.getInteriorAtCoords(976.6364, 70.29476, 115.1641);
    if (natives.isValidInterior(interiorID)) {
        natives.activateInteriorEntitySet(interiorID, 'Set_Pent_Tint_Shell');
        natives.activateInteriorEntitySet(interiorID, 'Set_Pent_Pattern_09');
        natives.activateInteriorEntitySet(interiorID, 'Set_Pent_Spa_Bar_Open');
        natives.activateInteriorEntitySet(interiorID, 'Set_Pent_Media_Bar_Open');
        natives.activateInteriorEntitySet(interiorID, 'Set_Pent_Arcade_Modern');
        natives.activateInteriorEntitySet(interiorID, 'Set_Pent_Bar_Clutter');
        natives.activateInteriorEntitySet(interiorID, 'Set_Pent_Clutter_03');
        natives.activateInteriorEntitySet(interiorID, 'Set_pent_bar_light_02');
        natives.refreshInterior(interiorID);
    }

    // Car Meet
    alt.Streaming.requestIpl('tr_tuner_meetup');
    alt.Streaming.requestIpl('tr_tuner_race_line');

    interiorID = 286209;
    if (natives.isValidInterior(interiorID)) {
        natives.activateInteriorEntitySet(interiorID, 'entity_set_meet_lights');
        natives.activateInteriorEntitySet(interiorID, 'entity_set_meet_lights_cheap');
        natives.activateInteriorEntitySet(interiorID, 'entity_set_test_lights');
        natives.activateInteriorEntitySet(interiorID, 'entity_set_test_lights_cheap');
        natives.activateInteriorEntitySet(interiorID, 'entity_set_time_trial');
        natives.refreshInterior(interiorID);
    }

    // Premium Deluxe Motorsport
    alt.Streaming.requestIpl('shr_int');

    interiorID = natives.getInteriorAtCoords(-31.328518, -1106.6293, 25.42235);
    if (natives.isValidInterior(interiorID)) {
        natives.activateInteriorEntitySet(interiorID, 'csr_beforeMission');
        natives.activateInteriorEntitySet(interiorID, 'shutter_closed'); // back door closed or uncomment this for open.
        natives.refreshInterior(interiorID);
    }
}

onTicksStart.add(fixMissingInteriors);
