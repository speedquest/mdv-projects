//
//  ViewController.m
//  MDF2_Calendar_Week1
//
//  Created by Nicholas Weil on 10/24/12.
//  Copyright (c) 2012 Nicholas Weil. All rights reserved.
//

#import "ViewController.h"
#import <EventKit/EventKit.h>
#import "DetailViewController.h"
#import "CustomCellView.h"
#import "AppDelegate.h"

@interface ViewController ()

@end

@implementation ViewController
@synthesize events, dates, calendars, manipulator, places;


- (void)viewDidLoad

{
    self.navigationController.navigationBar.tintColor = [UIColor colorWithRed:0.0 green:0.5 blue:0.5 alpha:1.0];
    [[UIApplication sharedApplication] cancelAllLocalNotifications];
    NSDate *notifyDate = [[NSDate date] dateByAddingTimeInterval:30];
    UILocalNotification *theNotification = [[UILocalNotification alloc] init];
    if (theNotification != nil)
    {
        theNotification.fireDate = notifyDate;
        theNotification.timeZone = [NSTimeZone localTimeZone];
        theNotification.alertBody = @"Did you mean to close The Calendar?";
        theNotification.alertAction = @"Re-open";
        [[UIApplication sharedApplication] scheduleLocalNotification:theNotification];
    }
    self.title = @"The Calendar";
    
    NSDate *date0 = [NSDate dateWithTimeIntervalSinceNow:86400+370];
    NSDate *date1 = [NSDate dateWithTimeIntervalSinceNow:86400*3+122];
    NSDate *date2 = [NSDate dateWithTimeIntervalSinceNow:86400*6+42];
    NSDate *date3 = [NSDate dateWithTimeIntervalSinceNow:86400*9+221];
    NSDate *date4 = [NSDate dateWithTimeIntervalSinceNow:86400*12+382];
    NSDate *date5 = [NSDate dateWithTimeIntervalSinceNow:86400*15+1122];
    NSDate *date6 = [NSDate dateWithTimeIntervalSinceNow:86400*17+334];
    NSDate *date7 = [NSDate dateWithTimeIntervalSinceNow:86400*20+765];
    NSDate *date8 = [NSDate dateWithTimeIntervalSinceNow:86400*22+1234];
    NSDate *date9 = [NSDate dateWithTimeIntervalSinceNow:86400*25+762];
    
    events = [[NSMutableArray alloc]initWithObjects:
              @"Full Sail Class: MDF2",
              @"Race at Daytona",
              @"Race at Road Atlanta",
              @"Coaching at Daytona",
              @"Coaching at Sebring",
              @"Race at Sebring",
              @"Seminar at Convention Center",
              @"Full Sail Class:MDF2",
              @"Apopka Food Truck Roundup",
              @"Coaching at Roebling Road",
              nil ];
    dates = [[NSMutableArray alloc]initWithObjects:
             date0,
             date1,
             date2,
             date3,
             date4,
             date5,
             date6,
             date7,
             date8,
             date9,
             nil];
    places = [[NSMutableArray alloc]initWithObjects:
                 @"Home",
                 @"Daytona, FL",
                 @"Braselton, GA",
                 @"Daytona, FL",
                 @"Sebring, FL",
                 @"Sebring, FL",
                 @"Orlando",
                 @"Home",
                 @"Apopka, FL",
                 @"Savannah, GA",
                 nil ];
    [super viewDidLoad];
    DetailViewController *detailView = [[DetailViewController alloc] initWithNibName:@"DetailViewController" bundle:nil];
    [detailView viewDidLoad];
    [theTableView reloadData];
	// Do any additional setup after loading the view, typically from a nib.
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    
    CustomCellView *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil)
    {
        NSArray *views = [[NSBundle mainBundle] loadNibNamed:@"CustomCellView" owner:nil options:nil];
        
        for (UIView *view in views)
        {
            if([view isKindOfClass:[CustomCellView class]])
            {
                cell = (CustomCellView*)view;
                cell.textLabel.text = [events objectAtIndex:indexPath.row];
                NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
                [dateFormat setDateFormat:@"MM-dd-yyyy 'at' HH:mm"];
                
                NSDate *tDate = [dates objectAtIndex:indexPath.row];
                NSString *fDate = [dateFormat stringFromDate:tDate];
                cell.detailLabel.text = fDate;
            }
        }
        cell.textLabel.text = [events objectAtIndex:indexPath.row];
        
        NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
        [dateFormat setDateFormat:@"MM-dd-yyyy 'at' HH:mm"];
        
        NSDate *tDate = [dates objectAtIndex:indexPath.row];
        NSString *fDate = [dateFormat stringFromDate:tDate];
        cell.detailLabel.text = fDate;
    }
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    DetailViewController *detailView = [[DetailViewController alloc] initWithNibName:@"DetailViewController" bundle:nil];
    NSString *theTitle = [events objectAtIndex:indexPath.row];
    NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
    [dateFormat setDateFormat:@"MM-dd-yyyy 'at' HH:mm"];
    NSDate *tDate = [dates objectAtIndex:indexPath.row];
    NSString *thePlaces = [places objectAtIndex:indexPath.row];
    if (manipulator != nil)
    {
        manipulator(theTitle);
    }
    [self presentModalViewController:detailView animated:true];
    [detailView passTitle:theTitle passDate:tDate passLocation:thePlaces];
}
/* 
    BAD CODE FROM iOS 5...
     
    EKEventStore *eventStore = [[EKEventStore alloc] init];
    if (eventStore != nil)
    {
        NSArray *calendars = [eventStore calendars];
        if (calendars != nil)
        {
            for (int i=0; i<[calendars count]; i++)
            {
                EKCalendar *calendar = [calendars objectAtIndex:i];
                NSLog(@"%@", [calendars description]);
                NSLog(@"%@", calendar.title);
            }
            NSDate *startDate = [NSDate date];
            NSDate *endDate = [[NSDate alloc] initWithTimeInterval:86400 sinceDate:startDate];
            NSPredicate *predicate = [eventStore predicateForEventsWithStartDate:startDate endDate:endDate calendars:nil];
            NSArray *events = [eventStore eventsMatchingPredicate:predicate];
            if (events != nil)
            {
                NSLog(@"%@", [events description]);
            }
        }
}*/
/*   EXAMPLE CODE FROM VIDEO
 EKEventStore *eventStore = [[EKEventStore alloc] init];
    if (eventStore != nil)
    {
        //  iOS 6 now requires access rights to be granted for Calendar access:
        [eventStore requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError *error)
        {
            if (granted)
            {
                NSArray *calendars = [eventStore calendarsForEntityType:EKEntityTypeEvent];
                if (calendars != nil)
                {
                    for (int i=0; i<[calendars count]; i++)
                    {
                        EKCalendar *calendar = [calendars objectAtIndex:i];
                        //NSLog(@"%@", [calendars]);
                        NSLog(@"%@", calendar.title);
                    }
                    NSDate *startDate = [NSDate date];
                    NSDate *endDate = [[NSDate alloc] initWithTimeInterval:86400 sinceDate:startDate];
                    NSPredicate *predicate = [eventStore predicateForEventsWithStartDate:startDate endDate:endDate calendars:nil];
                    NSArray *events = [eventStore eventsMatchingPredicate:predicate];
                    if (events != nil)
                    {
                        NSLog(@"%@", [events description]);
                    }
                }
            }
            else
            {
                
            }
        }];
    }
     [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}
 */

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
