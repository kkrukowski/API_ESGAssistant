import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EmissionData, EmissionType } from './emission-report.model';
import { CreateEmissionDataInput, CreateFuelModel } from '../dto/emission-data.input';

export enum FuelGroup {
  GaseousFuels = 'Gaseous fuels',
  LiquidFuels = 'Liquid fuels',
  SolidFuels = 'Solid fuels',
  BiofuelsBiomass = 'Biofuels/Biomass',
}

registerEnumType(FuelGroup, { name: 'FuelGroup' });

export enum FuelType {
  Butane = 'Butane',
  CNG = 'CNG',
  LNG = 'LNG',
  LPG = 'LPG',
  NaturalGas = 'Natural gas',
  NaturalGas100MineralBlend = 'Natural gas (100% mineral blend)',
  OtherPetroleumGas = 'Other petroleum gas',
  Propane = 'Propane',
  AviationSpirit = 'Aviation spirit',
  AviationTurbineFuel = 'Aviation turbine fuel',
  BurningOil = 'Burning oil',
  DieselAverageBiofuelBlend = 'Diesel (average biofuel blend)',
  Diesel100MineralDiesel = 'Diesel (100% mineral diesel)',
  FuelOil = 'Fuel oil',
  GasOil = 'Gas oil',
  Naphtha = 'Naphtha',
  PetrolAverageBiofuelBlend = 'Petrol (average biofuel blend)',
  Petrol100MineralPetrol = 'Petrol (100% mineral petrol)',
  ProcessedFuelOilsResidualOil = 'Processed fuel oils - residual oil',
  ProcessedFuelOilsDistillateOil = 'Processed fuel oils - distillate oil',
  WasteOils = 'Waste oils',
  MarineGasOil = 'Marine gas oil',
  MarineFuelOil = 'Marine fuel oil',
  CoalIndustrial = 'Coal (industrial)',
  CoalElectricityGeneration = 'Coal (electricity generation)',
  CoalDomestic = 'Coal (domestic)',
  CokingCoal = 'Coking coal',
  PetroleumCoke = 'Petroleum coke',
  CoalElectricityGenerationHomeProducedCoalOnly = 'Coal (electricity generation - home produced coal only)',
  Bioethanol = 'Bioethanol',
  BiodieselME = 'Biodiesel ME',
  BiomethaneCompressed = 'Biomethane (compressed)',
  BiodieselMEFromUsedCookingOil = 'Biodiesel ME (from used cooking oil)',
  BiodieselMEFromTallow = 'Biodiesel ME (from tallow)',
  BiodieselHVO = 'Biodiesel HVO',
  Biopropane = 'Biopropane',
  DevelopmentDiesel = 'Development diesel',
  DevelopmentPetrol = 'Development petrol',
  OffRoadBiodiesel = 'Off road biodiesel',
  BiomethaneLiquified = 'Biomethane (liquified)',
  MethanolBio = 'Methanol (bio)',
  AvturRenewable = 'Avtur (renewable)',
  WoodLogs = 'Wood logs',
  WoodChips = 'Wood chips',
  WoodPellets = 'Wood pellets',
  GrassStraw = 'Grass/straw',
  Biogas = 'Biogas',
  LandfillGas = 'Landfill gas',
}

registerEnumType(FuelType, { name: 'FuelType' });

export enum FuelUnit {
  Tonnes = 'tonnes',
  Litres = 'litres',
  CubicMetres = 'cubicMetres',
  KWhNetCv = 'kWhNetCv', // Net CV stands for Net Calorific Value
  KWhGrossCv = 'kWhGrossCv', // Gross CV stands for Gross Calorific Value
  GJ = 'gj',
  Kg = 'kg',
}

registerEnumType(FuelUnit, { name: 'FuelUnit' });

@ObjectType({ implements: () => [EmissionData] })
export class Fuel implements EmissionData {
  constructor(emissionData: CreateFuelModel) {
    this.fuelGroup = emissionData.fuelGroup;
    this.fuelType = emissionData.fuelType;
    this.unit = emissionData.unit;
    this.usedFuel = emissionData.usedFuel;
    this.totalCO2e = emissionData.totalCO2e;
    this.totalCO2 = emissionData.totalCO2;
    this.totalCH4 = emissionData.totalCH4;
    this.totalN2O = emissionData.totalN2O;
  }

  @Field(() => EmissionType)
  type: EmissionType.Fuel;

  @Field(() => FuelGroup)
  fuelGroup: FuelGroup; // Select field

  @Field(() => FuelType)
  fuelType: FuelType; // Select field

  @Field(() => FuelUnit)
  unit: FuelUnit; // Select field

  @Field(() => Float)
  usedFuel: number; // Number field

  @Field(() => Float)
  totalCO2e: number; // Calculation based on usedFuel

  @Field(() => Float)
  totalCO2?: number; // Calculation based on usedFuel

  @Field(() => Float)
  totalCH4?: number; // Calculation based on usedFuel

  @Field(() => Float)
  totalN2O?: number; // Calculation based on usedFuel
}
